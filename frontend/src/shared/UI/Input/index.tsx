import { FC } from "react";
import { InputProps } from "./types";

export const Input: FC<InputProps> = (props) => {
  if (props.type === "text" || props.type === "password") {
    return (
      <input
        type={props.type}
        ref={props.ref}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        className={props.className}
      />
    );
  }

  if (props.type === "checkbox") {
    return (
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        className={props.className}
      />
    );
  }
};
