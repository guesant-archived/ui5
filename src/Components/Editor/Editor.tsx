import styles from "./Editor.module.css";
import { EditorContextProvider } from "./Hooks/EditorContextProvider";

const Editor = () => {
  return (
    <div className={styles.editor}>
      <EditorContextProvider
        children={
          <>
          </>
        }
      />
    </div>
  );
};

export default Editor;
