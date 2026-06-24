import { useContext } from "react";
import { ThemeContext } from "../../../services/theme/theme.context";
import { Moon, Sun } from "lucide-react";

function ToggleTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === "light" ? "Oscuro" : "Claro"}</span>
        </button>
    );
}

export default ToggleTheme;