import { IEditorProject, ISetter } from "@guesant/ui5-lib";

export type IEditorContextState = {
  projects: IEditorProject[];
  currentProject: IEditorProject | null;
  currentProjectIndex: number;
  updateProject: (projectIndex: number, data: IEditorProject) => boolean;
  updateCurrentProject: (data: IEditorProject) => boolean;
  setProjects: ISetter<IEditorContextState["projects"]>;
  setCurrentProjectIndex: ISetter<number>;
};
