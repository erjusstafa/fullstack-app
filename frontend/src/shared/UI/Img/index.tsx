import React from "react";
import { ImageProps } from "./types";

export const Img: React.FC<ImageProps> = ({ src, alt, className, onClick, onMouseEnter, onMouseLeave, }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  />
);
