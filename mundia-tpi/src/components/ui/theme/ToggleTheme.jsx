import { useContext } from "react";
import { ThemeContext } from "../../../services/theme/theme.context";
import { Moon, Sun } from "lucide-react";

function ToggleTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} /> }
            <span>{theme === "light" ? "Claro" : "Oscuro"}</span>
        </button>
    );
}

export default ToggleTheme;