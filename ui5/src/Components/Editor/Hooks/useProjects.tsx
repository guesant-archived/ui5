import { EditorProject, IEditorProject, useList } from "@guesant/ui5-lib";
import { useCallback } from "react";

export const useProjects = <T extends IEditorProject = IEditorProject>(
  initial: T[] = [],
) => {
  const {
    updateItem,
    updateCurrentItem,
    items: projects,
    setItems: setProjects,
    currentItem: currentProject,
    currentIndex: currentProjectIndex,
    setCurrentIndex: setCurrentProjectIndex,
  } = useList<T>(initial);

  const updateProject = useCallback(
    (projectIndex: number, data: T) =>
      EditorProject.callbackParseTemplate(data, (i) =>
        updateItem(projectIndex, i),
      ),
    [updateItem],
  );

  const updateCurrentProject = useCallback(
    (data: T) =>
      EditorProject.callbackParseTemplate(data, (i) => updateCurrentItem(i)),
    [updateCurrentItem],
  );


  return {
    projects,
    setProjects,
    currentProject,
    currentProjectIndex,
    updateProject,
    updateCurrentProject,
    setCurrentProjectIndex,
  };
};
