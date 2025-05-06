import { MouseEvent, ReactNode } from "react";

export interface ButtonProps {
    type?: "button" | "submit" | "reset"; // default is "button"
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
  }
  