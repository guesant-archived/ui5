import { TextInput } from "carbon-components-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useContext } from "react";
import styles from "./Editor.module.css";
import { EditorContext } from "./Hooks/EditorContext";

const EditorRightProjectID = () => {
  const [[idFieldProjectID]] = useState(() => [nanoid()] as const);
  const { currentProject } = useContext(EditorContext);
  return (
    <>
      <div>
        <TextInput
          readOnly
          labelText="ID"
          id={"id" + idFieldProjectID}
          value={currentProject!.meta?.id}
          onFocus={(e) => e.target.select()}
        />
      </div>
    </>
  );
};

const EditorRightProject = () => {
  const { currentProject } = useContext(EditorContext);
  return (
    <>
      {currentProject && (
        <>
          <div className={styles.editProject}>
            <EditorRightProjectID />
          </div>
        </>
      )}
    </>
  );
};

export default EditorRightProject;
