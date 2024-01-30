import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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

interface FormType {
  name: string | undefined;
  category: string;
  tag: string;
}

const initialFormState: FormType = {
  name: "",
  category: "Please select a category",
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
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  const isLoggedIn = useSelector((state: RootState) => state.auth.logged_in);
  const navigate = useNavigate();

  function addNewTag() {
    if (formState.tag.length < 3) return;
    setTags((prevTags) => [...prevTags, formState.tag]);
    formDispatch({ property: "tag", value: "" });
  }

  function submitForm() {
    console.log("submit form");
  }

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
          <FileInput id="resume-input" labelText="Choose Resume" />
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
        <div></div>
      </div>
    </div>
  );
};

export default CreateMarketplace;
