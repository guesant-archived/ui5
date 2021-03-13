import { TextInput } from "carbon-components-react";
import immer from "immer";
import { nanoid } from "nanoid";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
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

const EditorRightProjectName = () => {
  const [[idFieldProjectName]] = useState(() => [nanoid()]);
  const [tempProjectName, setTempProjectName] = useState("");
  const { currentProject, updateCurrentProject } = useContext(EditorContext);

  useEffect(() => {
    setTempProjectName(currentProject?.meta?.name || "");
  }, [currentProject]);

  return (
    <>
      <div>
        <TextInput
          labelText="Nome"
          value={tempProjectName}
          id={"id" + idFieldProjectName}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setTempProjectName(e.target.value)}
          onBlur={(e) => {
            setTempProjectName(e.target.value.trim());
            updateCurrentProject(
              immer(currentProject!, (draft) => {
                draft.meta!.name = e.target.value.trim();
              }),
            );
          }}
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
            <EditorRightProjectName />
          </div>
        </>
      )}
    </>
  );
};

export default EditorRightProject;
