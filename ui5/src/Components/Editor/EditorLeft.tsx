import { Tab, Tabs } from "carbon-components-react";
import { useContext } from "react";
import styles from "./Editor.module.css";
import { EditorContext } from "./Hooks/EditorContext";

const EditorLeft = () => {
  const { currentProject, updateSelection } = useContext(EditorContext);

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
