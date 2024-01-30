import { ChangeEvent, FC, ReactElement } from "react";
import { IconButton } from "@mui/material";

// local imports
import { InputProps, CSSProps } from "../types/props";
import { InputDiv } from "./Input";

interface SelectType {
  id: string;
  selectOptions: Array<string>;
  labelText?: string;
  inputProps?: InputProps;
  inputCSSProps?: CSSProps;
  Icon?: ReactElement;
  iconClick?: () => void;
}

const Select: FC<SelectType> = ({
  id,
  selectOptions,
  labelText,
  inputProps,
  inputCSSProps,
  Icon,
  iconClick,
}) => {
  const selectPropsOnChange = inputProps?.onChange as unknown as (
    e: ChangeEvent<HTMLSelectElement>
  ) => void;

  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <InputDiv>
        <select
          name={id}
          required={inputProps?.required}
          value={inputProps?.value}
          onChange={selectPropsOnChange}
          style={{
            margin: 0,
            width: "100%",
            border: "none",
            padding: "0.5rem",
            outline: "none",
            fontSize: "inherit",
            background: "white",
            ...{ inputCSSProps },
          }}
        >
          {selectOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {Icon && <IconButton onClick={iconClick}>{Icon}</IconButton>}
      </InputDiv>
    </>
  );
};

export default Select;
