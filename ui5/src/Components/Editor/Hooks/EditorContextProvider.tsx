import { IEditorProject } from "@guesant/ui5-lib";
import { EditorContext } from "./EditorContext";
import { useProjects } from "./useProjects";

export const EditorContextProvider: React.FC = ({ children }) => {
  const {
    projects,
    setProjects,
    updateProject,
    removeProject,
    currentProject,
    updateSelection,
    currentProjectIndex,
    updateCurrentProject,
    updateSelectedObjects,
    setCurrentProjectIndex,
  } = useProjects<IEditorProject>([]);

  return (
    <EditorContext.Provider
      value={{
        projects,
        setProjects,
        removeProject,
        updateProject,
        currentProject,
        updateSelection,
        currentProjectIndex,
        updateCurrentProject,
        updateSelectedObjects,
        setCurrentProjectIndex,
      }}
      children={children}
    />
  );
};
