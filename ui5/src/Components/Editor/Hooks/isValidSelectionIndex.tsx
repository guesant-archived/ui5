import { IEditorProject } from "@guesant/ui5-lib";

export const isValidSelectionIndex = (
  index: number,
  ref: "object" | "static",
  project: IEditorProject,
) =>
  index >= 0 &&
  index <
    (ref === "object"
      ? project.model.fabricExported.objects
      : project.model.staticImages
    ).length;
