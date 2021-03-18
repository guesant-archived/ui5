import { ISmartProjectSelectionOptions } from "./smartProjectSelection";

export type IUpdateSelectionOptions = ISmartProjectSelectionOptions & {
  projectIndex?: number;
};
