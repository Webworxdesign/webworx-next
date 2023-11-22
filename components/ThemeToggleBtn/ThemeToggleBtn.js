import { useTheme } from "../../context/ThemeContext";
import classNames from 'classnames/bind';
import styles from './ThemeToggleBtn.module.scss';
import DarkModeIcon from "../../assets/svg/DarkModeIcon";
import LightModeIcon from "../../assets/svg/LightModeIcon";

let cx = classNames.bind(styles);

const ThemeToggleBtn = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      aria-label="Toggle Dark Mode" 
      className={[cx('toggle-button', isDarkMode ? 'toggled' : '' )]} 
      onClick={toggleTheme}
    >
      <div className={ cx('knobs') }>{ isDarkMode ? <DarkModeIcon /> : <LightModeIcon /> }</div>
      <div className={ cx('layer') }></div>
    </button>
  );
};

export default ThemeToggleBtn;