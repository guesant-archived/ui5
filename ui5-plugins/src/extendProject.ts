import { IEditorProject } from "@guesant/ui5-lib";
import { Canvas } from "fabric/fabric-impl";

export const extendProject = async (
  canvas: Canvas,
  currentProject: IEditorProject,
  prevProject: IEditorProject | null,
) => {
  return () => {};
};
