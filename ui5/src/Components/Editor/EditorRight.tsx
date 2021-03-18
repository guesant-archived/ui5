import { IEditorProject } from "@guesant/ui5-lib";
import { strictEqualHandler } from "@guesant/utils";
import { Tab, Tabs } from "carbon-components-react";
import { createElement, useContext, useEffect, useState } from "react";
import styles from "./Editor.module.css";
import EditorRightObjects from "./EditorRightObjects";
import EditorRightProject from "./EditorRightProject";
import { EditorContext } from "./Hooks/EditorContext";

/* Tabs */

const TAB_PROJECT = 0;
const TAB_OBJECTS = 1;

const TabProjects: IEditorRightTab = [
  "Projeto",
  TAB_PROJECT,
  EditorRightProject,
];

const TabObjects: IEditorRightTab = [
  "Objetos",
  TAB_OBJECTS,
  EditorRightObjects,
];

const EditorRightTabs: IEditorRightTab[] = [TabProjects, TabObjects];

type IEditorRightTab = [string, number, React.FC];

/* End Tabs */

const EditorRight = () => {
  const [currentTab, setCurrentTab] = useState(TAB_PROJECT);
  const { currentProject, currentProjectIndex } = useContext(EditorContext);
  const [prevProjectIndex, setPrevProjectIndex] = useState<number | null>(null);
  const [prevProject, setPrevProject] = useState<IEditorProject | null>(null);

  useEffect(() => {
    if (
      currentProjectIndex !== prevProjectIndex ||
      strictEqualHandler(prevProject, currentProject, (i) => i?.meta?.selection)
    ) {
      setCurrentTab(
        currentProject?.meta?.selection.length ? TAB_OBJECTS : TAB_PROJECT,
      );
    }
    setPrevProject(currentProject);
    setPrevProjectIndex(currentProjectIndex);
  }, [prevProject, currentProject, prevProjectIndex, currentProjectIndex]);

  return (
    <div className={styles.editorRight}>
      <Tabs
        selected={currentTab}
        onSelectionChange={(idx) => setCurrentTab(idx)}
      >
        {EditorRightTabs.map(([label, ref, reactElement]) => (
          <Tab
            key={ref}
            label={label}
            children={createElement(reactElement, {})}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default EditorRight;
