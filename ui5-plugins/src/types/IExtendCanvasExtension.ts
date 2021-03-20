import { IEditorProject } from "@guesant/ui5-lib";
import { functionQueue } from "@guesant/utils";
import { Canvas } from "fabric/fabric-impl";
import { IUpdateProject } from "./IUpdateProject";

export type IExtendCanvasExtension = (
  canvas: Canvas,
  currentProject: IEditorProject,
  updateProject: IUpdateProject,
  cleanup: ReturnType<typeof functionQueue>,
) => void;
