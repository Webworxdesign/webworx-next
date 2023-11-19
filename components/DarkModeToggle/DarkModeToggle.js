import React, { useState, useEffect } from 'react';
import Toggle from "react-toggle";

export const DarkModeToggle = () => {
    
    const [themeDark, setThemeDark] = useState( 
        typeof window !== "undefined" ? localStorage.getItem('themeDark') : '' 
    ); 
      
    const toggleTheme = () => {
        if (themeDark === false) {
          setThemeDark(true);
        } else {
          setThemeDark(false);
        } 
    }; 
    
    useEffect(() => {
        localStorage.setItem('themeDark', themeDark);
        document.body.className = themeDark; 
    }, [themeDark]);
    
    return (
        <div >
          <Toggle
            onChange={() => toggleTheme}
            icons={{ checked: "🌙", unchecked: "🔆" }}
            aria-label="Dark mode toggle"
            />
        </div>
      );
};