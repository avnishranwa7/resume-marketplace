import { FormEvent, useState, useReducer } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// styles imports
import classes from "./Login.module.css";

// local imports
import Input from "../../components/Input";
import { login } from "../../redux/auth";

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

const Login = () => {
  const [loginSelected, setLoginSelected] = useState(true);
  const [formState, formDispatch] = useReducer(formReducer, formInitialState);
  const [formErrors, formErrorsDispatch] = useReducer(
    formReducer,
    formInitialState
  );

  const navigate = useNavigate();

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    formErrorsDispatch({ property: "call", value: "" });
    const response = await fetch(
      `http://ec2-13-211-174-173.ap-southeast-2.compute.amazonaws.com:3000/auth/${
        loginSelected ? "login" : "signup"
      }`,
      {
        method: `${loginSelected ? "POST" : "PUT"}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
          ...(!loginSelected && { name: formState.name }),
          ...(!loginSelected && { confirmPassword: formState.confirmPassword }),
        }),
      }
    );

    const data = await response.json();
    if (response.status === 422) {
      for (let input of data.data) {
        formErrorsDispatch({ property: input.path, value: input.msg });
      }
    }

    if (response.status === 201) {
      login({ userId: data.userId, email: data.email });
      localStorage.setItem(
        "auth",
        JSON.stringify({ userId: data.userId, email: data.email })
      );
      navigate("/");
    }
  }

  function changeView() {
    formDispatch({ property: "clear", value: "" });
    formErrorsDispatch({ property: "clear", value: "" });
    setLoginSelected((prev) => !prev);
  }

  return (
    <div className={classes.auth}>
      <div className={classes.actions}>
        <Button
          variant="outlined"
          className={loginSelected ? classes.focused : undefined}
          onClick={changeView}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          className={!loginSelected ? classes.focused : undefined}
          onClick={changeView}
        >
          Sign Up
        </Button>
      </div>
      <form onSubmit={submitForm}>
        <span className={classes["mobile-error"]}>{formErrors.name}</span>
        {!loginSelected && (
          <Input
            inputProps={{
              id: "name",
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
          inputProps={{
            id: "email",
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
          inputProps={{
            id: "password",
            placeholder: "Password",
            type: "password",
            value: formState.password ?? "",
            onChange: (e) =>
              formDispatch({ property: "password", value: e.target.value }),
            required: true,
          }}
          error={formErrors.password}
        />
        <span className={classes["mobile-error"]}>
          {formErrors.confirmPassword}
        </span>
        {!loginSelected && (
          <Input
            inputProps={{
              id: "confirmPassword",
              placeholder: "Confirm Password",
              type: "password",
              value: formState.confirmPassword ?? "",
              onChange: (e) =>
                formDispatch({
                  property: "confirmPassword",
                  value: e.target.value,
                }),
              required: true,
            }}
            error={formErrors.confirmPassword}
          />
        )}
        <Button variant="outlined" type="submit">
          {loginSelected ? "Login" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
