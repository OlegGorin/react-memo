import { useContext } from "react";
import { EasyModeContext } from "./EasyModeContext";

export const useEasyMode = () => {
  return useContext(EasyModeContext);
};
