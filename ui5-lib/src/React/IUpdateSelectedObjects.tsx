import { ITemplateObject } from "@fantastic-images/core/dist/types/ITemplateObject";
import { WritableDraft } from "immer/dist/internal";

export type IUpdateSelectedObjects = (
  handler: (object: WritableDraft<ITemplateObject>) => ITemplateObject | void,
) => any;
