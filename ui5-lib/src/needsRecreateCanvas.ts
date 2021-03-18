import { strictEqual } from "@guesant/utils";
import { IEditorProject } from "./IEditorProject";

export const needsRecreateCanvas = (
  currentProject: IEditorProject,
  prevProject: IEditorProject | null,
) => {
  return !strictEqual(prevProject?.model.sketch, currentProject.model.sketch);
};
