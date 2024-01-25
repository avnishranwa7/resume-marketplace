import { FC, ReactElement } from "react";
import styled from "styled-components";
import { IconButton, Tooltip } from "@mui/material";

// local imports
import { InputProps, CSSProps } from "../types/props";

// icons imports
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface InputType {
  id: string;
  labelText?: string;
  inputProps?: InputProps;
  inputCSSProps?: CSSProps;
  Icon?: ReactElement;
  iconClick?: () => void;
  error?: string;
}

const Input: FC<InputType> = ({
  id,
  labelText,
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
          style={{
            margin: 0,
            width: "100%",
            border: "none",
            padding: "0.5rem",
            outline: "none",
            fontSize: "inherit",
            ...{ inputCSSProps },
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

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

export default Input;
