// check what the new theme is, then remove other themes and apply new theme
export const applyTheme = (theme: string) => {
    if (theme === "dark") 
    {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("contrast");
      document.documentElement.classList.add("dark"); 
      localStorage.setItem("Theme", "dark");
    } 
    else if (theme === "light") 
    {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("contrast");
      document.documentElement.classList.add("light");
      localStorage.setItem("Theme", "light");
    }
    else if (theme === "contrast")
    {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("contrast");
      localStorage.setItem("Theme", "contrast");
    }
  };
  
  export const loadTheme = () => {
    // set the theme to the theme stored in local storage or light as default
    const savedTheme = localStorage.getItem("Theme") || "light";
    applyTheme(savedTheme);
  };