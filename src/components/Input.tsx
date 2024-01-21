import { FC, ReactElement } from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";

// local imports
import { InputProps, CSSProps } from "../types/props";

// icons imports
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface InputType {
  inputProps?: InputProps;
  inputCSSProps?: CSSProps;
  Icon?: ReactElement;
  error?: string;
}

const Input: FC<InputType> = ({ inputProps, inputCSSProps, Icon, error }) => {
  return (
    <InputDiv>
      <input
        {...inputProps}
        style={{
          margin: 0,
          width: "100%",
          border: "none",
          padding: "0.5rem",
          outline: "none",
          ...{ inputCSSProps },
        }}
      />
      {error === "" && (
        <CheckCircleOutlineIcon
          sx={{
            fontSize: "1rem",
            color: "green",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        />
      )}
      {error && error !== "" && (
        <Tooltip title={error}>
          <CloseOutlinedIcon
            sx={{
              fontSize: "1rem",
              color: "red",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
            }}
          />
        </Tooltip>
      )}
      {Icon}
    </InputDiv>
  );
};

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

export default Input;
