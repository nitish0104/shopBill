import React, { useState, useEffect, createContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      <div className={`theme-${isDarkMode ? "dark" : "light"}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

const Card = () => {
  return (
    <ThemeContext.Consumer>
      {({ isDarkMode, toggleMode }) => (
        <div
          className={`bg-${isDarkMode ? "gray-800" : "white"} text-${
            isDarkMode ? "white" : "gray-800"
          } p-4`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Card Component</h2>
            <button
              className={`rounded-full p-2 ${
                isDarkMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"
              } `}
              onClick={toggleMode}
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <p>This is a sample card component.</p>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Card />
    </ThemeProvider>
  );
};

export default App;
