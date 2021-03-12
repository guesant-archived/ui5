import { Tab, Tabs } from "carbon-components-react";
import { createElement, useContext, useEffect, useState } from "react";
import styles from "./Editor.module.css";

/* Tabs */

const EditorRightTabs: IEditorRightTab[] = [];

type IEditorRightTab = [string, number, React.FC];

/* End Tabs */

const EditorRight = () => {
  const [currentTab, setCurrentTab] = useState(TAB_PROJECT);

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
