import { Tab, Tabs } from "carbon-components-react";
import { useContext } from "react";
import styles from "./Editor.module.css";
import { EditorLeftObjectsList } from "./EditorLeftObjectsList";
import { EditorLeftStaticList } from "./EditorLeftStaticList";
import { EditorContext } from "./Hooks/EditorContext";

const getModeFromEvent = (event: React.MouseEvent) =>
  event.shiftKey ? "range" : event.ctrlKey ? "push" : "simple";

export type IHandleClick = (idx: number) => (e: React.MouseEvent) => void;

const EditorLeft = () => {
  const { currentProject, updateSelection } = useContext(EditorContext);

  const hClick = (ref: "static" | "object") => (idx: number) => (
    event: React.MouseEvent,
  ) => updateSelection(getModeFromEvent(event), ref, idx);

  return (
    <div className={styles.editorLeft}>
      <Tabs>
        <Tab label="Camadas">
          <div
            className={styles.projects}
            onClick={(e) => {
              e.target === e.currentTarget && updateSelection("clear");
            }}
          >
            <ul className={styles.projectsList}>
              {currentProject && (
                <>
                  <li className={styles.project}>
                    <div className={styles.projectHeader}>
                      <p>{currentProject.meta?.name?.trim?.() || "Projeto"}</p>
                    </div>
                    <div>
                      <ul>
                        <EditorLeftStaticList
                          position="front"
                          project={currentProject}
                          handleClick={hClick("static")}
                        />
                        <EditorLeftObjectsList
                          project={currentProject}
                          handleClick={hClick("object")}
                        />
                        <EditorLeftStaticList
                          position="back"
                          project={currentProject}
                          handleClick={hClick("static")}
                        />
                      </ul>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default EditorLeft;
