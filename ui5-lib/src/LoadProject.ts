import { ReadBlob } from "@guesant/utils";
import { EditorProject } from "./EditorProject";
import { IEditorProject } from "./IEditorProject";

export class LoadProject {
  static fromBlob = async (blob: Blob) => {
    try {
      return EditorProject.parseTemplate(await ReadBlob.readBlobAsText(blob));
    } catch (_) {}
    return null;
  };
  static fromBlobArray = async (blobArray: Blob[]) => {
    return await Promise.all([...blobArray.map(LoadProject.fromBlob)])
      .catch(() => [])
      .then((loaded) => loaded.filter((i) => i !== null) as IEditorProject[]);
  };
}
