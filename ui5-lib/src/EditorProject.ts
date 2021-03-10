import { Template, TemplateSchema } from "@fantastic-images/core";
import { array, number, object, string, ObjectSchema } from "yup";
import { IEditorProject } from "./IEditorProject";

export const EditorProjectSchema: ObjectSchema<any> = TemplateSchema.shape({
  meta: object()
    .shape({
      name: string().optional(),
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
}
