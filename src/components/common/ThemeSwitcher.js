import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const useSavedTheme = () => {
    const [localTheme, setLocalTheme] = useState(
      localStorage.getItem("theme") !== null
        ? localStorage.getItem("theme")
        : "dark"
    );

    const saveChangedTheme = (changedTheme) => {
      localStorage.setItem("theme", changedTheme);
      setLocalTheme(changedTheme);
    };

    return [localTheme, saveChangedTheme];
  };

  const [theme, setTheme] = useSavedTheme();
  const body = document.getElementsByTagName("body")[0];
  body.classList.add(theme === "dark" ? "dark" : "light");

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    if (body.classList.length !== 0)
      body.classList.replace(
        theme === "dark" ? "light" : "dark",
        theme === "dark" ? "dark" : "light"
      );
    else body.classList.add(theme === "dark" ? "dark" : "light");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <button
        className="ThemeSwitcher"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <FontAwesomeIcon color="#fff" icon="moon" />
        ) : (
          <FontAwesomeIcon color="#000" icon="sun" />
        )}
      </button>
    </>
  );
};

export default ThemeSwitcher;
