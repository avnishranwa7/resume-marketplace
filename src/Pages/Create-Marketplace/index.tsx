import { useState, useEffect, useReducer, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";
import { toast } from "react-toastify";

// icons imports
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

// styles imports
import classes from "./index.module.css";

// local imports
import { RootState } from "../../redux";
import Input from "../../components/Input";
import { CATEGORIES } from "../../Constants/MarketplaceCategories";
import Select from "../../components/Select";
import FileInput from "../../components/FileInput";
import { MarketplaceService } from "../../services/marketplace";

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
  const [open, setOpen] = useState(true);
  const [tags, setTags] = useState<Array<string>>([]);
  const [formError, setFormError] = useState<string>("");
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.logged_in);
  const navigate = useNavigate();

  async function submitForm() {
    if (formState.name === "") {
      setFormError("Please enter your Marketplace name");
      return;
    }
    if (!fileInputRef.current?.files || !fileInputRef.current?.files[0]) {
      setFormError("Please upload your resume");
      return;
    }

    setFormError("");
    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("name", formState.name);
    formData.append("category", formState.category);
    if (tags.length > 0) formData.append("tags", JSON.stringify(tags));
    formData.append("upload_file", fileInputRef.current?.files[0]);

    const response = await MarketplaceService.createMarketplace(formData);
    const data = await response.json();
    if (response.status === 201) toast.success("Marketplace created");
    else toast.error(data.message);
  }

  function addNewTag() {
    if (formState.tag.length < 3) return;
    setTags((prevTags) => [...prevTags, formState.tag]);
    formDispatch({ property: "tag", value: "" });
  }

  const { data: marketplaces, isFetching: isFetchingMarketplaces } = useQuery({
    queryKey: ["marketplaces"],
    queryFn: async () => {
      const response = await MarketplaceService.getMarketplaces({
        email: JSON.parse(localStorage.getItem("auth")!).email,
        token: JSON.parse(localStorage.getItem("auth")!).token,
      });

      const data = await response.json();
      return data.marketplaces;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  return (
    <div className={classes.marketplace}>
      <div className={classes.add}>
        <Button
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
        </Button>
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
            labelText="Tag length must be atleast 3 characters long"
          />
          <div className={classes.tags}>
            {tags.map((tag) => (
              <span key={tag} className={classes.tag}>
                {tag}
              </span>
            ))}
          </div>
          <FileInput
            ref={fileInputRef}
            id="resume-input"
            labelText="Choose Resume"
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
      <div className={classes.divider}></div>
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
      </div>
    </div>
  );
};

export default CreateMarketplace;
