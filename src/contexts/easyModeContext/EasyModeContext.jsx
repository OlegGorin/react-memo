import { useState, createContext } from "react";

export const EasyModeContext = createContext(false);

export const EasyModeProvider = ({ children }) => {
  const [isEasyMode, setIsEasyMode] = useState(false);
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
      }}
    >
      {children}
    </EasyModeContext.Provider>
  );
};
