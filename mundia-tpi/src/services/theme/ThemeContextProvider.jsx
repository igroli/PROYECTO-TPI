import { useEffect, useState } from "react";
import { ThemeContext } from "./theme.context";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || LIGHT_THEME
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.classList.toggle("theme-dark", theme === DARK_THEME);
        document.documentElement.classList.toggle("theme-light", theme === LIGHT_THEME);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;