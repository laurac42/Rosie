export const applyTheme = (theme: string) => {
    if (theme === "dark") 
    {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark"); 
      localStorage.setItem("Theme", "dark");
    } 
    else if (theme === "light") 
    {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("Theme", "light");
    }
  };
  
  export const loadTheme = () => {
    // set the theme to the theme stored in local storage or light as default
    const savedTheme = localStorage.getItem("Theme") || "light";
    applyTheme(savedTheme);
  };