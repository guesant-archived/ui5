import {
  EditorProject,
  IEditorProject,
  IUpdateSelectedObjects,
  useList,
} from "@guesant/ui5-lib";
import { Number as NumberUtils } from "@guesant/utils";
import immer from "immer";
import { useCallback } from "react";
import { getProjectObjects } from "./getProjectObjects";
import { isValidSelectionIndex } from "./isValidSelectionIndex";
import { IUpdateSelection } from "./IUpdateSelection";
import { IUpdateSelectionOptions } from "./IUpdateSelectionOptions";
import { smartProjectSelection } from "./smartProjectSelection";

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

  const removeProject = useCallback(
    (projectIndex: number) => {
      const arrayProjects = projects.filter((_, idx) => idx !== projectIndex);
      setProjects(arrayProjects);
      setCurrentProjectIndex(
        NumberUtils.minMax(
          0,
          arrayProjects.length - 1,
        )(
          projectIndex < currentProjectIndex
            ? currentProjectIndex
            : currentProjectIndex - (projects.length - arrayProjects.length),
        ),
      );
    },
    [currentProjectIndex, projects, setCurrentProjectIndex, setProjects],
  );

  const updateSelection: IUpdateSelection = useCallback(
    (
      mode: "clear" | "simple" | "range" | "push" = "simple",
      ref: "static" | "object" | undefined,
      index: number | undefined,
      { projectIndex, ...options }: IUpdateSelectionOptions = {},
    ) => {
      const targetIndex = projectIndex ?? currentProjectIndex;
      const project = projects[projectIndex ?? currentProjectIndex];

      if (!project) return;

      switch (mode) {
        case "clear":
          updateProject(
            targetIndex,
            immer(project, (draft) => void (draft.meta!.selection = [])),
          );
          return;
      }

      if (
        ref === undefined ||
        index === undefined ||
        !isValidSelectionIndex(index, ref, project)
      ) {
        return;
      }

      updateProject(
        targetIndex,
        immer(project, (draft) => {
          draft.meta!.selection = smartProjectSelection(
            mode,
            project,
            { ref, index },
            options,
          );
        }),
      );
    },
    [currentProjectIndex, projects, updateProject],
  );

  const updateSelectedObjects: IUpdateSelectedObjects = useCallback(
    (handler) => {
      if (!currentProject) return;
      const selection = EditorProject.getProjectSelection(currentProject);
      const _isSelected = (idx: number) =>
        selection.find(({ index }) => index === idx) !== undefined;
      selection.length &&
        getProjectObjects(currentProject).length &&
        updateCurrentProject(
          immer(currentProject, (draft) => {
            const fabricExported = draft.model.fabricExported;
            fabricExported.objects = getProjectObjects(draft).map((i, idx) =>
              _isSelected(idx) ? immer(i, handler) : i,
            );
          }),
        );
    },
    [currentProject, updateCurrentProject],
  );

  return {
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
  };
};
