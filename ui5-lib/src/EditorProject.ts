import { Template, TemplateSchema } from "@fantastic-images/core";
import { nanoid } from "nanoid";
import { array, number, object, ObjectSchema, string } from "yup";
import { IEditorProject } from "./IEditorProject";

export const EditorProjectSchema: ObjectSchema<any> = TemplateSchema.shape({
  meta: object()
    .shape({
      id: string().default(() => nanoid(32)),
      name: string().trim().optional(),
      selection: array()
        .of(object().shape({ ref: string(), index: number() }))
        .default(() => []),
    })
    .default(() => ({})),
});

export class EditorProject extends Template {
  static isValidTemplate(template: any) {
    return EditorProjectSchema.isValidSync(template);
  }
  static parseTemplate(template: any) {
    if (EditorProject.isValidTemplate(template)) {
      return EditorProjectSchema.validateSync(template) as IEditorProject;
    }
    return null;
  }
  static callbackParseTemplate = <T extends IEditorProject = IEditorProject>(
    data: T,
    callback: (data: T) => void,
  ) => {
    if (EditorProject.isValidTemplate(data)) {
      callback(EditorProject.parseTemplate(data)! as any);
      return true;
    }
    return false;
  };
  static isSelected = (project: IEditorProject) => (
    ref: "static" | "object",
    idx: number,
  ) => {
    return (
      project.meta?.selection.find(
        ({ index: iIndex, ref: iRef }) => iIndex === idx && iRef === ref,
      ) !== undefined
    );
  };
  static getProjectSelection = (
    project: IEditorProject,
    ref?: "static" | "object",
  ) => {
    const { selection = [] } = project.meta! || {};
    return selection.filter((i) => (ref !== undefined ? i.ref === ref : true));
  };
  static getSelectedObjects = (project: IEditorProject) => {
    const {
      model: {
        fabricExported: { objects },
      },
    } = project;
    const selection = EditorProject.getProjectSelection(project, "object");
    return objects.filter(
      (_, idx) => selection.find(({ index }) => index === idx) !== undefined,
    );
  };
}
