import { IEditorProject } from "@guesant/ui5-lib";
import { functionQueue } from "@guesant/utils";
import { Canvas } from "fabric/fabric-impl";

export const extendCanvas = (
  canvas: Canvas,
  currentProject: IEditorProject,
) => {
  const cleanup = functionQueue();
  return () => void cleanup.runAll();
};
