import { FC, ReactElement } from "react";
import styled from "styled-components";
import { IconButton, Tooltip } from "@mui/material";

// icons imports
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// local imports
import { InputProps, CSSProps } from "../types/props";

interface InputType {
  id: string;
  labelText?: string;
  minLength?: number;
  inputProps?: InputProps;
  inputCSSProps?: CSSProps;
  Icon?: ReactElement;
  iconClick?: () => void;
  error?: string;
}

const Input: FC<InputType> = ({
  id,
  labelText,
  minLength = 1,
  inputProps,
  inputCSSProps,
  Icon,
  error,
  iconClick,
}) => {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <InputDiv>
        <input
          {...inputProps}
          id={id}
          name={id}
          minLength={minLength}
          style={{
            margin: 0,
            width: "100%",
            border: "none",
            padding: "0.5rem",
            outline: "none",
            fontSize: "inherit",
            ...inputCSSProps,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && iconClick) iconClick();
          }}
        />
        {Icon && <IconButton onClick={iconClick}>{Icon}</IconButton>}
        {error === "" && (
          <CheckCircleOutlineIcon
            sx={{
              fontSize: "1.2rem",
              color: "green",
              paddingRight: "0.5rem",
              paddingLeft: "0.5rem",
            }}
          />
        )}
        {error && error !== "" && (
          <Tooltip title={error}>
            <CloseOutlinedIcon
              sx={{
                fontSize: "1.2rem",
                color: "red",
                paddingRight: "0.5rem",
                paddingLeft: "0.5rem",
              }}
            />
          </Tooltip>
        )}
      </InputDiv>
    </>
  );
};

export const InputDiv = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

export default Input;
