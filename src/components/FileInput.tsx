import { ReactElement, forwardRef } from "react";
import { IconButton } from "@mui/material";

// local imports
import { CSSProps } from "../types/props";

interface InputType {
  id: string;
  labelText?: string;
  inputCSSProps?: CSSProps;
  Icon?: ReactElement;
  iconClick?: () => void;
}

const FileInput = forwardRef<HTMLInputElement, InputType>((props, ref) => {
  const { id, labelText, inputCSSProps, Icon, iconClick } = props;
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        ref={ref}
        accept="application/pdf"
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
});

export default FileInput;
