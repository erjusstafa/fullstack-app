import { Input } from "antd";
import "./style.scss";
import { ToggleModeProps } from "./types";
import { FC } from "react";

const ToggleMode: FC<ToggleModeProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="toggle-mode">
      <label className="theme-switcher">
        <Input
          type="checkbox"
          checked={isDarkMode === "dark" ? true : false}
          onChange={toggleTheme}
          className="theme-switcher-checkbox"
        />
        <span className="theme-switcher-slider"></span>
      </label>
    </div>
  );
};

export default ToggleMode;
