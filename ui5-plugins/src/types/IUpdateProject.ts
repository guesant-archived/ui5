import { IEditorProject } from "@guesant/ui5-lib";
import { WritableDraft } from "immer/dist/internal";

export type IUpdateProject = (
  handler: (draft: WritableDraft<IEditorProject>) => void,
) => void;
