import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './ThemeToggleBtn.module.scss';
import DarkModeIcon from "../../assets/svg/DarkModeIcon";
import LightModeIcon from "../../assets/svg/LightModeIcon";
import useLocalStorage from '../../useLocalStorage/useLocalStorage';

let cx = classNames.bind(styles);

const ThemeToggleBtn = () => {

  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <button 
      aria-label="Toggle Dark Mode" 
      className={[cx('toggle-button', darkMode ? 'toggled' : '' )]} 
      onClick={() => setDarkMode(!darkMode)}>
      <div className={ cx('knobs') }>{ darkMode ? <DarkModeIcon /> : <LightModeIcon /> }</div>
      <div className={ cx('layer') }></div>
    </button>
  );
};

export default ThemeToggleBtn;