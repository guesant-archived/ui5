import styles from "./Editor.module.css";
import EditorHeader from "./EditorHeader";
import { EditorContextProvider } from "./Hooks/EditorContextProvider";

const Editor = () => {
  return (
    <div className={styles.editor}>
      <EditorContextProvider
        children={
          <>
            <EditorHeader />
          </>
        }
      />
    </div>
  );
};

export default Editor;
