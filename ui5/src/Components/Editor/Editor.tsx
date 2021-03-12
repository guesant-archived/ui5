import styles from "./Editor.module.css";
import EditorHeader from "./EditorHeader";
import EditorToolbar from "./EditorToolbar";
import { EditorContextProvider } from "./Hooks/EditorContextProvider";

const Editor = () => {
  return (
    <div className={styles.editor}>
      <EditorContextProvider
        children={
          <>
            <EditorHeader />
            <EditorToolbar />
          </>
        }
      />
    </div>
  );
};

export default Editor;
