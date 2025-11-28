import { useQueryStates } from "nuqs";
import { workflowsParams } from "../param";

export const useWorkflowsParam = () => {
  return useQueryStates(workflowsParams);
};