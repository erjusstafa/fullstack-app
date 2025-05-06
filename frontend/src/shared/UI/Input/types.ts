import {
    ChangeEvent,
    KeyboardEvent,
    RefObject,
  } from "react";
  
  interface BaseInputProps {
    className?: string;
    required?:boolean 
  }
  
  interface TextLikeInputProps  extends BaseInputProps {
    type: "text" | "password";
    value: string;
    placeholder?: string;
    name?:string;
    ref?: RefObject<HTMLInputElement>;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  }
  
  interface CheckboxInputProps extends BaseInputProps {
    type: "checkbox";
    checked: boolean;
    onChange: () => void;
  }
  
  export type InputProps = TextLikeInputProps  | CheckboxInputProps;
  