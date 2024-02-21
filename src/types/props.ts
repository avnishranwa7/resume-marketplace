import { ChangeEvent } from "react";

export interface InputProps {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number";
  required?: boolean;
  id?: string;
  placeholder?: string;
  border?: string;
}

export interface CSSProps {
  margin?: string;
  padding?: string;
  width?: string;
  fontSize?: string;
}
