import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { themeChanged } from "../../store/common/ui";

import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
    const dispatch = useDispatch();

    const theme = useSelector((state) => state.ui.theme);
    const body = document.getElementsByTagName("body")[0];
    body.classList.add(theme);

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];

        if (body.classList.length !== 0)
            body.classList.replace(
                theme === "dark" ? "light" : "dark",
                theme === "dark" ? "dark" : "light"
            );
        else body.classList.add(theme);
    }, [theme]);

    return (
        <>
            <button
                className="ThemeSwitcher"
                onClick={() =>
                    dispatch(
                        themeChanged({
                            theme: theme === "dark" ? "light" : "dark",
                        })
                    )
                }
            >
                {theme === "dark" ? (
                    <FontAwesomeIcon color="var(--text)" icon="moon" />
                ) : (
                    <FontAwesomeIcon color="var(--text)" icon="sun" />
                )}
            </button>
        </>
    );
};

export default ThemeSwitcher;
