import { useProjects } from "./useProjects";

export type IEditorContextState = ReturnType<typeof useProjects> & {};
