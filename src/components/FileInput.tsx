import { FC, ReactElement } from "react";
import { IconButton } from "@mui/material";

// local imports
import { InputProps, CSSProps } from "../types/props";

interface InputType {
  id: string;
  labelText?: string;
  inputProps?: InputProps;
  inputCSSProps?: CSSProps;
  Icon?: ReactElement;
  iconClick?: () => void;
  error?: string;
}

const FileInput: FC<InputType> = ({
  id,
  labelText,
  inputCSSProps,
  Icon,
  iconClick,
}) => {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        type="file"
        style={{
          display: Icon ? "hidden" : "block",
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
    </>
  );
};

export default FileInput;
