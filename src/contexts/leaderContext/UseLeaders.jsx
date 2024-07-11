import { useContext } from "react";
import { LeadersContext } from "./LeaderContext";

export const useLeaders = () => {
  return useContext(LeadersContext);
};
