import { useContext } from "react";
import styles from "./Editor.module.css";
import { EditorContext } from "./Hooks/EditorContext";

const EditorRightProject = () => {
  const { currentProject } = useContext(EditorContext);

  return (
    <>
      {currentProject && (
        <>
          <div className={styles.editProject}>
          </div>
        </>
      )}
    </>
  );
};

export default EditorRightProject;
