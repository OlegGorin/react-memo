import { useState, createContext } from "react";

const getEasyModeFromLocalStorage = () => {
  const easyModeInfo = localStorage.getItem("easyMode");
  return easyModeInfo ? JSON.parse(easyModeInfo) : null;
};

export const EasyModeContext = createContext(false);

export const EasyModeProvider = ({ children }) => {
  const [isEasyMode, setIsEasyMode] = useState(getEasyModeFromLocalStorage());

  const setIsEasy = newEasyMode => {
    setIsEasyMode(newEasyMode);
    localStorage.setItem("easyMode", JSON.stringify(newEasyMode));
  };

  const clearIsEasy = () => {
    localStorage.removeItem("easyMode");
    setIsEasyMode(false);
  };

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [forceEye, setForceEye] = useState(true);
  const [forceCards, setForceCards] = useState(2);
  const [isAlohomora, setIsAlohomora] = useState(false);

  return (
    <EasyModeContext.Provider
      value={{
        isEasyMode,
        setIsEasyMode,
        selectedLevel,
        setSelectedLevel,
        forceEye,
        setForceEye,
        forceCards,
        setForceCards,
        isAlohomora,
        setIsAlohomora,
        setIsEasy,
        clearIsEasy,
      }}
    >
      {children}
    </EasyModeContext.Provider>
  );
};
