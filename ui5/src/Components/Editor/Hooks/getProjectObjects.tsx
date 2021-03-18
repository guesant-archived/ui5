import { IEditorProject } from "@guesant/ui5-lib";

export const getProjectObjects = (project: IEditorProject) =>
  project.model.fabricExported.objects;
