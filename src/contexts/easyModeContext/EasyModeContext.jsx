import { useState, createContext } from "react";

export const EasyModeContext = createContext(false);

export const EasyModeProvider = ({ children }) => {
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  return (
    <EasyModeContext.Provider
      value={{
        isEasyMode,
        setIsEasyMode,
        selectedLevel,
        setSelectedLevel,
      }}
    >
      {children}
    </EasyModeContext.Provider>
  );
};
