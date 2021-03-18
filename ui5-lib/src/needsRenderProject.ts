import { strictEqualHandler } from "@guesant/utils";
import { IEditorProject } from "./IEditorProject";

export const needsRenderProject = (
  currentProject: IEditorProject,
  prevProject: IEditorProject | null,
) => {
  return (
    !strictEqualHandler(
      prevProject,
      currentProject,
      (i) => i?.model.staticImages,
    ) ||
    !strictEqualHandler(
      prevProject,
      currentProject,
      (i) => i?.model.fabricExported.objects.length,
    ) ||
    !strictEqualHandler(
      prevProject,
      currentProject,
      (i) => i?.model.fabricExported.objects,
    )
  );
};
