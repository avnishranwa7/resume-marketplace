import { FormEvent, useState, useReducer, useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

// icons imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// styles imports
import classes from "./Login.module.css";

// local imports
import Input from "../../components/Input";
import { AuthService } from "../../services/auth";
import { RootState } from "../../redux";

interface FormType {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

interface ActionType {
  property: string;
  value: string;
}

const formInitialState: FormType = {
  name: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
};

function formReducer(state: FormType, action: ActionType): FormType {
  if (action.property === "name") {
    return { ...state, name: action.value };
  }
  if (action.property === "email") {
    return { ...state, email: action.value };
  }
  if (action.property === "password") {
    return { ...state, password: action.value };
  }
  if (action.property === "confirmPassword") {
    return { ...state, confirmPassword: action.value };
  }

  if (action.property === "call") {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  if (action.property === "clear") {
    return formInitialState;
  }

  return state;
}

interface ShowPasswordType {
  password: boolean;
  confirmPassword: boolean;
}

const showPasswordInitialState: ShowPasswordType = {
  password: false,
  confirmPassword: false,
};

function showPasswordReducer(
  state: ShowPasswordType,
  action: "password" | "confirmPassword"
) {
  if (action === "password") {
    return { ...state, password: !state.password };
  }

  if (action === "confirmPassword") {
    return { ...state, confirmPassword: !state.confirmPassword };
  }

  return state;
}

const Login = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector((state: RootState) => state.auth.logged_in);

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  const [loginSelected, setLoginSelected] = useState(true);
  const [formState, formDispatch] = useReducer(formReducer, formInitialState);
  const [formErrors, formErrorsDispatch] = useReducer(
    formReducer,
    formInitialState
  );
  const [showPassword, showPasswordDispatch] = useReducer(
    showPasswordReducer,
    showPasswordInitialState
  );
  const [generalError, setGeneralError] = useState("");

  const prevPath = useSelector((state: RootState) => state.navigate.path);
  const params = useLocation().search;
  let urlError = "";
  let urlSuccess = "";
  if (params.split("error").length > 1) {
    urlError = params.split("error")[1].substring(1);
  }
  if (params.split("success").length > 1) {
    urlSuccess = params.split("success")[1].substring(1);
  }

  async function login() {
    return AuthService.login({
      email: formState.email,
      password: formState.password,
      ...(!loginSelected && { name: formState.name }),
      ...(!loginSelected && { confirmPassword: formState.confirmPassword }),
    });
  }

  async function signup() {
    return AuthService.signup({
      email: formState.email,
      password: formState.password,
      ...(!loginSelected && { name: formState.name }),
      ...(!loginSelected && { confirmPassword: formState.confirmPassword }),
    });
  }

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setGeneralError("");
    formErrorsDispatch({ property: "call", value: "" });
    const response = loginSelected ? await login() : await signup();

    const data = await response.json();
    if (response.status === 422) {
      for (let input of data.data) {
        formErrorsDispatch({ property: input.path, value: input.msg });
      }
    }

    if (response.status === 401) {
      setGeneralError(data.message);
    }

    if (response.status === 200 || response.status === 201) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ userId: data.userId, email: data.email })
      );

      if (response.status === 200)
        navigate(
          `${prevPath === "/create-marketplace" ? "/create-marketplace" : "/"}`
        );

      if (response.status === 201) navigate(`/verify?email=${data.email}`);
    }
  }

  function changeView() {
    formDispatch({ property: "clear", value: "" });
    formErrorsDispatch({ property: "clear", value: "" });
    setLoginSelected((prev) => !prev);
  }

  return (
    <div className={classes.auth}>
      <div className={classes.alert}>
        {generalError !== "" && (
          <Alert
            severity="error"
            sx={{ marginBottom: "1rem", fontSize: "inherit" }}
          >
            {generalError}
          </Alert>
        )}
        {prevPath === "/create-marketplace" && (
          <Alert
            severity="warning"
            sx={{ marginBottom: "1rem", fontSize: "inherit" }}
          >
            You must be logged in to create a marketplace
          </Alert>
        )}
        {urlError !== "" && (
          <Alert
            severity="warning"
            sx={{ marginBottom: "1rem", fontSize: "inherit" }}
          >
            {decodeURIComponent(urlError)}
          </Alert>
        )}
        {urlSuccess !== "" && (
          <Alert
            severity="success"
            sx={{ marginBottom: "1rem", fontSize: "inherit" }}
          >
            {decodeURIComponent(urlSuccess)}
          </Alert>
        )}
      </div>
      <div className={classes.actions}>
        <Button
          variant="outlined"
          className={loginSelected ? classes.focused : undefined}
          onClick={changeView}
          sx={{ fontSize: "inherit" }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          className={!loginSelected ? classes.focused : undefined}
          onClick={changeView}
          sx={{ fontSize: "inherit" }}
        >
          Sign Up
        </Button>
      </div>
      <form onSubmit={submitForm}>
        <span className={classes["mobile-error"]}>{formErrors.name}</span>
        {!loginSelected && (
          <Input
            id="name"
            inputProps={{
              placeholder: "Name",
              value: formState.name ?? "",
              onChange: (e) =>
                formDispatch({ property: "name", value: e.target.value }),
              required: true,
            }}
            error={formErrors.name}
          />
        )}
        <span className={classes["mobile-error"]}>{formErrors.email}</span>
        <Input
          id="email"
          inputProps={{
            placeholder: "Email",
            type: "email",
            value: formState.email ?? "",
            onChange: (e) =>
              formDispatch({ property: "email", value: e.target.value }),
            required: true,
          }}
          error={formErrors.email}
        />
        <span className={classes["mobile-error"]}>{formErrors.password}</span>
        <Input
          id="password"
          inputProps={{
            placeholder: "Password",
            type: showPassword.password ? "text" : "password",
            value: formState.password ?? "",
            onChange: (e) =>
              formDispatch({ property: "password", value: e.target.value }),
            required: true,
          }}
          error={formErrors.password}
          Icon={
            showPassword.password ? <VisibilityIcon /> : <VisibilityOffIcon />
          }
          iconClick={() => showPasswordDispatch("password")}
        />
        <span className={classes["mobile-error"]}>
          {formErrors.confirmPassword}
        </span>
        {!loginSelected && (
          <Input
            id="confirmPassword"
            inputProps={{
              placeholder: "Confirm Password",
              type: showPassword.confirmPassword ? "text" : "password",
              value: formState.confirmPassword ?? "",
              onChange: (e) =>
                formDispatch({
                  property: "confirmPassword",
                  value: e.target.value,
                }),
              required: true,
            }}
            error={formErrors.confirmPassword}
            Icon={
              showPassword.confirmPassword ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )
            }
            iconClick={() => showPasswordDispatch("confirmPassword")}
          />
        )}
        <Button variant="outlined" type="submit" sx={{ fontSize: "inherit" }}>
          {loginSelected ? "Login" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
