import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './ThemeToggleBtn.module.scss';
import DarkModeIcon from "../../assets/svg/DarkModeIcon";
import LightModeIcon from "../../assets/svg/LightModeIcon";
import useLocalStorage from '../../useLocalStorage/useLocalStorage';
import Moon from "../../assets/svg/MoonIcon";
import Sun from "../../assets/svg/SunIcon";

let cx = classNames.bind(styles);

const ThemeToggleBtn = () => {

  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    // console.log(darkMode);
    if (darkMode) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  }, [darkMode]);

  return (
    <button 
      id="theme-mode-button"
      aria-label="Toggle Dark Mode" 
      className={[cx('toggle-button', darkMode ? 'toggled' : '' )]} 
      onClick={() => setDarkMode(!darkMode)} >
      <div className={ cx('knobs') }>{ darkMode ? <Moon /> : <Sun /> }</div>
      <div className={ cx('layer') }></div>
    </button>
  );
};

export default ThemeToggleBtn;