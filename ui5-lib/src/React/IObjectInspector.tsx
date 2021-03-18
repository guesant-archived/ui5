import { ITemplateObject } from "@fantastic-images/core/dist/types/ITemplateObject";
import { IInspectorComponent } from "./IInspectorComponent";

export type IObjectInspector = {
  willBeUsed: (objects: ITemplateObject[]) => boolean;
  getComponent: () => IInspectorComponent;
};
