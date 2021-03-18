import { ITemplateObject } from "@fantastic-images/core/dist/types/ITemplateObject";
import * as React from "react";
import { IUpdateSelectedObjects } from "./IUpdateSelectedObjects";

export type IInspectorComponent = React.FC<{
  objects: ITemplateObject[];
  updateSelectedObjects: IUpdateSelectedObjects;
}>;
