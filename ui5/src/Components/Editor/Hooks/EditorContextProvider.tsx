import { IEditorProject } from "@guesant/ui5-lib";
import { EditorContext } from "./EditorContext";
import { useProjects } from "./useProjects";

export const EditorContextProvider: React.FC = ({ children }) => {
  const {
    projects,
    setProjects,
    updateProject,
    currentProject,
    currentProjectIndex,
    updateCurrentProject,
    setCurrentProjectIndex,
  } = useProjects<IEditorProject>([]);

  return (
    <EditorContext.Provider
      value={{
        projects,
        setProjects,
        currentProject,
        currentProjectIndex,
        updateProject,
        updateCurrentProject,
        setCurrentProjectIndex,
      }}
      children={children}
    />
  );
};
