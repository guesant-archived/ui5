import { createContext } from "react";
import { IEditorContextState } from "./IEditorContextState";

export const EditorContext = createContext<IEditorContextState>({} as any);
