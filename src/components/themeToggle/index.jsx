import { useTheme } from '../../context/themecontext';
import '../../assets/css/themeToggle.css';
import { IoMoonOutline } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";


const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <span className="theme-toggle-btn" onClick={toggleTheme}>
            {darkMode ? (
                <span><IoIosSunny /></span>
            ) : (
                <span><IoMoonOutline /></span>
            )}
        </span>
    );
};
8
export default ThemeToggle;