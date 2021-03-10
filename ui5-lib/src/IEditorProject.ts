import { ITemplate } from "@fantastic-images/core/dist/types/ITemplate";

export type IEditorProject = ITemplate<{
  name: string;
  selection: IEditorProjectSelection[];
}>;

export type IEditorProjectSelection = {
  ref: "static" | "object";
  index: number;
};
