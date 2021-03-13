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

// Dimensions

const DimensionWidth = { label: "Width", key: "width" } as const;
const DimensionHeight = { label: "Height", key: "height" } as const;

const Dimensions = [DimensionWidth, DimensionHeight] as const;

// End Dimensions

const EditorRightProjectDimensions = () => {
  const [[idFieldDimensions]] = useState(() => [nanoid()]);
  const { currentProject, updateCurrentProject } = useContext(EditorContext);

  const updateProjectDimension = useCallback(
    (key: "width" | "height", value: number | string) => {
      if (currentProject) {
        updateCurrentProject(
          immer(currentProject, (draft) => {
            draft.model.sketch[key] = Math.max(Math.floor(+value) || 0, 0);
          }),
        );
      }
    },
    [currentProject, updateCurrentProject],
  );

  return (
    <>
      <div className={styles.editProjectDimensions}>
        {Dimensions.map(({ label, key }) => (
          <Fragment
            key={key}
            children={
              <TextInput
                min={0}
                step={1}
                labelText={label}
                id={"id" + idFieldDimensions + key}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  updateProjectDimension(key, +e.target.value);
                }}
                value={currentProject!.model.sketch[key] ?? 0}
              />
            }
          />
        ))}
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
            <EditorRightProjectDimensions />
          </div>
        </>
      )}
    </>
  );
};

export default EditorRightProject;
