import { Template, TemplateSchema } from "@fantastic-images/core";
import { array, number, object, string, ObjectSchema } from "yup";
import { IEditorProject } from "./IEditorProject";
import { nanoid } from "nanoid";

export const EditorProjectSchema: ObjectSchema<any> = TemplateSchema.shape({
  meta: object()
    .shape({
      id: string().default(() => nanoid()),
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
}
