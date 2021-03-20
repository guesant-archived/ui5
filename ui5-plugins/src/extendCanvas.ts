import { IEditorProject } from "@guesant/ui5-lib";
import { functionQueue } from "@guesant/utils";
import { Canvas } from "fabric/fabric-impl";
import { IExtendCanvasExtension } from "./types/IExtendCanvasExtension";
import { IUpdateProject } from "./types/IUpdateProject";

const extendCanvasExtensions: IExtendCanvasExtension[] = [
];

export const extendCanvas = (
  canvas: Canvas,
  currentProject: IEditorProject,
  updateProject: IUpdateProject,
) => {
  const cleanup = functionQueue();
  for (const extension of extendCanvasExtensions) {
    extension(canvas, currentProject, updateProject, cleanup);
  }
  return () => void cleanup.runAll();
};
