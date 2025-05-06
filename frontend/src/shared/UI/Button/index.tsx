import { FC } from "react";
import { ButtonProps } from "./types";

export const Button: FC<ButtonProps> = ({ type = "button", onClick, disabled = false, className, children, }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={className}>
            {children}
        </button>
    );
};
