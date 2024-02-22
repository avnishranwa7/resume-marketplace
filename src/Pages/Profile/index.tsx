import { useMemo, useReducer, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

// icons imports
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AbcIcon from "@mui/icons-material/Abc";
import LanguageIcon from "@mui/icons-material/Language";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import WorkIcon from "@mui/icons-material/Work";

// styles imports
import classes from "./index.module.css";

// local imports
import User from "../../assets/user.png";
import { UserService } from "../../services/user";
import { RootState } from "../../redux";
import Input from "../../components/Input";

interface UserProfileType {
  name: string;
  profile: {
    location?: {
      city?: string;
      state?: string;
      country?: string;
    };
    yeo?: number;
    title?: string;
  };
}

interface FormType {
  name: string;
  title: string;
  city: string;
  state: string;
  country: string;
  yeo: string;
}

interface ActionType {
  property: string;
  value: string | number;
}

const initialFormState: FormType = {
  name: "",
  title: "",
  city: "",
  state: "",
  country: "",
  yeo: "",
};

function formReducer(state: FormType, action: ActionType) {
  return { ...state, [action.property]: action.value };
}

const Profile = () => {
  const [profileEditing, setProfileEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const client = useQueryClient();

  function toUserProfile(data: any): UserProfileType {
    return {
      name: data.name,
      profile: data.profile,
    };
  }

  async function getUserProfile() {
    const response = await UserService.getUser({
      userId: user.userId,
      token: user.token,
    });
    const data = await response.json();
    return data;
  }

  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    select: (data) => {
      const transformedData = toUserProfile(data.data);
      formDispatch({
        property: "name",
        value: transformedData.name,
      });
      formDispatch({
        property: "title",
        value: transformedData.profile.title ?? "",
      });
      formDispatch({
        property: "city",
        value: transformedData.profile.location?.city ?? "",
      });
      formDispatch({
        property: "state",
        value: transformedData.profile.location?.state ?? "",
      });
      formDispatch({
        property: "country",
        value: transformedData.profile.location?.country ?? "",
      });
      formDispatch({
        property: "yeo",
        value: transformedData.profile.yeo ?? "",
      });

      return transformedData;
    },
    refetchOnWindowFocus: false,
  });

  const anyLocationExist = useMemo(() => {
    return (
      userProfile?.profile.location?.city ||
      userProfile?.profile.location?.state ||
      userProfile?.profile.location?.country ||
      false
    );
  }, [
    userProfile?.profile.location?.city,
    userProfile?.profile.location?.state,
    userProfile?.profile.location?.country,
  ]);

  const location = useMemo(() => {
    let loc = "";
    if (!anyLocationExist) {
      loc = "City, State, Country";
    } else {
      if (userProfile?.profile.location?.city)
        loc = userProfile?.profile.location?.city ?? "";

      if (userProfile?.profile.location?.state) {
        if (loc !== "") loc += ", ";

        loc = loc + (userProfile?.profile.location?.state ?? "");
      }

      if (userProfile?.profile.location?.country) {
        if (loc !== "") loc += ", ";

        loc = loc + (userProfile?.profile.location?.country ?? "");
      }
    }

    return loc;
  }, [
    anyLocationExist,
    userProfile?.profile.location?.city,
    userProfile?.profile.location?.state,
    userProfile?.profile.location?.country,
  ]);

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  async function saveProfile() {
    setSaving(true);

    const response = await UserService.saveProfile({
      userId: user.userId,
      token: user.token,
      name: formState.name,
      title: formState.title,
      city: formState.city,
      state: formState.state,
      country: formState.country,
      yeo: formState.yeo,
    });

    setSaving(false);
    if (response.status !== 200) {
      const data = await response.json();
      toast.error(data.message);
    } else {
      setProfileEditing(false);
      toast.success("Profile Saved");
      client.invalidateQueries({ queryKey: ["user-profile"] });
    }
  }

  return (
    <div className={classes["profile-page"]}>
      <div className={classes.profile}>
        <img src={User} alt="Profile" />
        {!profileEditing ? (
          <h1>{userProfile?.name}</h1>
        ) : (
          <Input
            id="user-name"
            inputProps={{
              value: formState.name,
              placeholder: "Name",
              onChange: (e) =>
                formDispatch({ property: "name", value: e.target.value }),
            }}
            Icon={<AbcIcon />}
          />
        )}
        {!profileEditing ? (
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}
          >
            <h2>{userProfile?.profile.title ?? "Title"}</h2>
            {!userProfile?.profile.title && (
              <Tooltip title="Required">
                <ReportGmailerrorredIcon color="error" />
              </Tooltip>
            )}
          </span>
        ) : (
          <Input
            id="user-title"
            inputProps={{
              value: formState.title,
              placeholder: "Title",
              onChange: (e) =>
                formDispatch({ property: "title", value: e.target.value }),
            }}
            Icon={<AbcIcon />}
          />
        )}
        <div className={classes.location}>
          {!profileEditing ? (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
            >
              <LocationOnIcon fontSize="small" />
              {location}
              {!anyLocationExist && (
                <Tooltip title="Required">
                  <ReportGmailerrorredIcon color="error" />
                </Tooltip>
              )}
            </span>
          ) : (
            <div className={classes["location-editing"]}>
              <Input
                id="user-city"
                inputProps={{
                  value: formState.city,
                  placeholder: "City",
                  onChange: (e) =>
                    formDispatch({ property: "city", value: e.target.value }),
                }}
                Icon={<LanguageIcon />}
              />
              <Input
                id="user-state"
                inputProps={{
                  value: formState.state,
                  placeholder: "State",
                  onChange: (e) =>
                    formDispatch({ property: "state", value: e.target.value }),
                }}
                Icon={<LanguageIcon />}
              />
              <Input
                id="user-country"
                inputProps={{
                  value: formState.country,
                  placeholder: "Country",
                  onChange: (e) =>
                    formDispatch({
                      property: "country",
                      value: e.target.value,
                    }),
                }}
                Icon={<LanguageIcon />}
              />
            </div>
          )}
        </div>
        <div className={classes.yeo}>
          {!profileEditing ? (
            <>
              <WorkIcon />
              <span>
                Years of Experience
                {userProfile?.profile.yeo !== undefined &&
                  `: ${userProfile?.profile.yeo}`}
              </span>
              {userProfile?.profile.yeo === undefined && (
                <Tooltip title="Required">
                  <ReportGmailerrorredIcon color="error" />
                </Tooltip>
              )}
            </>
          ) : (
            <Input
              id="user-yeo"
              inputProps={{
                type: "number",
                value: formState.yeo,
                placeholder: "Years of Experience",
                onChange: (e) =>
                  formDispatch({
                    property: "yeo",
                    value: e.target.value,
                  }),
              }}
              Icon={<WorkIcon />}
            />
          )}
        </div>
        <LoadingButton
          loading={saving}
          variant="outlined"
          color={profileEditing ? "success" : "primary"}
          onClick={
            profileEditing
              ? saveProfile
              : () => {
                  setProfileEditing(true);
                }
          }
          sx={{ mt: !profileEditing ? "2rem" : 0 }}
        >
          {profileEditing ? "Save Profile" : "Edit Profile"}
        </LoadingButton>
      </div>
    </div>
  );
};

export default Profile;
