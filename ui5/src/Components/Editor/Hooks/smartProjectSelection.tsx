import { Template } from "@fantastic-images/core";
import {
  EditorProject,
  IEditorProject,
  IEditorProjectSelection,
} from "@guesant/ui5-lib";
import { Array as ArrayUtils } from "@guesant/utils";

const getMapedArrayPosition = <T extends readonly [any, number]>(arr: T[]) => (
  index: number,
) => arr.findIndex(([, realIndex]) => index === realIndex);

const filterSelection = (arr: IEditorProjectSelection[]) =>
  arr.filter(
    (i, idx, arr) => arr.findIndex((j) => i.index === j.index) === idx,
  );

export type ISmartProjectSelectionOptions = { staticSorted?: boolean };

export const smartProjectSelection = (
  mode: "clear" | "simple" | "range" | "push",
  project: IEditorProject,
  draftSelection: IEditorProjectSelection,
  options: ISmartProjectSelectionOptions = {},
) => {
  if (mode === "clear") return [];
  const currentSelection = EditorProject.getProjectSelection(
    project,
    draftSelection.ref,
  );

  switch (mode === "range" && currentSelection.length === 0 ? "simple" : mode) {
    case "simple":
      return [draftSelection];
    case "push":
      return ArrayUtils.Selection.toggleSelection(
        draftSelection,
        currentSelection,
        (i) => i.index !== draftSelection.index,
      );
    case "range":
      return filterSelection(
        ArrayUtils.Selection.rangeSelection(
          draftSelection,
          currentSelection,
          (i) => i.index,
          (index) => ({ ref: draftSelection.ref, index }),
          (a, b) => a.index === b.index,
          (a, b) => {
            const [
              computed_a,
              computed_b,
              mapHandler = <T,>(index: T) => index,
            ] =
              draftSelection.ref === "static" && options.staticSorted
                ? (() => {
                    const sortedStatic = Template.getStaticSorted(project);
                    const _getSortedPosition = getMapedArrayPosition(
                      sortedStatic,
                    );
                    return [
                      _getSortedPosition(a),
                      _getSortedPosition(b),
                      (index: number) => sortedStatic[index][1],
                    ] as const;
                  })()
                : ([a, b] as const);
            return ArrayUtils.getNumericRange(computed_a, computed_b).map(
              mapHandler,
            );
          },
        ),
      );
    default:
      return [];
  }
};
