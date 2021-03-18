import { IUpdateSelectionOptions } from "./IUpdateSelectionOptions";

export type IUpdateSelection = {
  (mode: "clear", ...args: undefined[]): void;
  (
    mode: "simple" | "range" | "push",
    ref: "static" | "object",
    selectionIndex: number,
    options?: IUpdateSelectionOptions,
  ): void;
};
