import { useState, useEffect, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

// icons imports
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

// styles imports
import classes from "./index.module.css";

// local imports
import { RootState } from "../../redux";
import { logout } from "../../redux/auth";
import Input from "../../components/Input";
import { CATEGORIES } from "../../Constants/MarketplaceCategories";
import Select from "../../components/Select";
import FileInput from "../../components/FileInput";
import { MarketplaceService } from "../../services/marketplace";
import MarketplaceItem from "./MarketplaceItem";
import { MarketplaceItemType } from "./types";
import Tag from "./Tag";

interface FormType {
  name: string;
  category: string;
  tag: string;
}

const initialFormState: FormType = {
  name: "",
  category: "IT",
  tag: "",
};

interface ActionType {
  property: string;
  value: string;
}

function formReducer(state: FormType, action: ActionType) {
  return { ...state, [action.property]: action.value };
}

const CreateMarketplace = () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  const [tags, setTags] = useState<Array<string>>([]);
  const [formError, setFormError] = useState<string>("");
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const authDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.logged_in);
  const navigate = useNavigate();
  const client = useQueryClient();

  async function submitForm() {
    if (formState.name === "") {
      setFormError("Please enter your Marketplace name");
      return;
    }
    if (!fileInputRef.current?.files || !fileInputRef.current?.files[0]) {
      setFormError("Please upload your resume");
      return;
    }

    if (fileInputRef.current?.files[0].type !== "application/pdf") {
      setFormError("Only PDFs are allowed");
      return;
    }

    setSubmitLoading(true);
    setFormError("");

    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("token", user.token);
    formData.append("name", formState.name);
    formData.append("category", formState.category);
    if (tags.length > 0) formData.append("tags", JSON.stringify(tags));
    formData.append("upload_file", fileInputRef.current?.files[0]);

    const response = await MarketplaceService.createMarketplace(formData);
    const data = await response.json();

    setSubmitLoading(false);
    if (response.status === 201) {
      toast.success("Marketplace created");
      formDispatch({ property: "name", value: "" });
      formDispatch({ property: "category", value: "IT" });
      formDispatch({ property: "tag", value: "" });
      setTags([]);
      fileInputRef.current.value = "";
      client.invalidateQueries({ queryKey: ["marketplaces"] });
    } else {
      toast.error(data.message);
      if (data.message === "Token Expired") {
        authDispatch(logout());
      }
    }
  }

  function addNewTag() {
    if (formState.tag.length < 2) return;
    setTags((prevTags) => {
      if (prevTags.includes(formState.tag)) return prevTags;
      return [...prevTags, formState.tag];
    });
    formDispatch({ property: "tag", value: "" });
  }

  function deleteTag(tag: string) {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  }

  async function getMarketplaces(): Promise<Array<MarketplaceItemType>> {
    const response = await MarketplaceService.getMarketplaces({
      userId: user.userId,
      token: user.token,
    });

    const data = await response.json();

    if (response.status !== 200) {
      toast.error(data.message);
      if (data.message === "Token Expired") {
        authDispatch(logout());
      }
    }

    return data.marketplaces;
  }

  function toMarketplaceItem(place: any): MarketplaceItemType {
    return {
      id: place._id,
      name: place.name,
      tags: place.tags,
      category: place.category,
      resumes: place.resumes,
    };
  }

  const { data: marketplaces, isFetching: isFetchingMarketplaces } = useQuery({
    queryKey: ["marketplaces"],
    queryFn: getMarketplaces,
    select: (data) => data.map(toMarketplaceItem),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  return (
    <div className={classes.marketplace}>
      <div className={classes.add}>
        <LoadingButton
          loading={submitLoading}
          variant="outlined"
          endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          className={classes["mobile-view"]}
          onClick={() =>
            setOpen((prev) => {
              if (prev) {
                setTimeout(() => {
                  if (document.getElementById("laptop-view"))
                    document.getElementById("laptop-view")!.style.display =
                      "none";
                }, 400);
              } else if (document.getElementById("laptop-view")) {
                document.getElementById("laptop-view")!.style.display = "flex";
              }

              return !prev;
            })
          }
        >
          Create a new Marketplace
        </LoadingButton>
        {open && formError && (
          <Alert severity="error" sx={{ margin: "1rem", fontSize: "inherit" }}>
            {formError}
          </Alert>
        )}
        <div
          id="laptop-view"
          className={
            classes["laptop-view"] + " " + classes[open ? "close" : "open"]
          }
        >
          <Input
            id="marketplace-name"
            minLength={8}
            labelText="Marketplace Name"
            inputProps={{
              placeholder: "Marketplace Name",
              required: true,
              value: formState.name ?? "",
              onChange: (e) =>
                formDispatch({ property: "name", value: e.target.value }),
            }}
          />
          <Select
            id="create-marketplace-categories"
            selectOptions={CATEGORIES}
            labelText="Category"
            inputProps={{
              required: true,
              value: formState.category,
              onChange: (e) =>
                formDispatch({
                  property: "category",
                  value: e.target.value,
                }),
            }}
          />
          <Input
            id="marketplace-tags"
            inputProps={{
              required: true,
              placeholder: "Tags",
              value: formState.tag,
              onChange: (e) =>
                formDispatch({ property: "tag", value: e.target.value }),
            }}
            Icon={<AddCircleOutlineIcon />}
            iconClick={addNewTag}
            labelText="Tag length must be atleast 2 characters long"
          />
          <div className={classes.tags}>
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} deletable deleteTag={deleteTag} />
            ))}
          </div>
          <FileInput
            ref={fileInputRef}
            id="resume-input"
            labelText="Choose Resume (only PDFs)"
          />
          <Button
            className={classes["submit-button"]}
            variant="outlined"
            onClick={submitForm}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className={classes.marketplaces}>
        <h2>Your Marketplaces</h2>
        {isFetchingMarketplaces && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LinearProgress sx={{ width: "80%" }} />
          </Box>
        )}
        {marketplaces && marketplaces.length === 0 && (
          <p>No marketplaces found</p>
        )}
        <div className={classes["marketplace-list"]}>
          {marketplaces &&
            marketplaces.length > 0 &&
            marketplaces.map((place) => (
              <MarketplaceItem key={place.id} place={place} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CreateMarketplace;
