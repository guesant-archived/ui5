import { ITemplateObject } from "@fantastic-images/core/dist/types/ITemplateObject";
import { EditorProject } from "@guesant/ui5-lib";
import { ObjectInspectors } from "@guesant/ui5-plugins";
import { createElement, Fragment, useContext } from "react";
import styles from "./Editor.module.css";
import { EditorContext } from "./Hooks/EditorContext";

const getSharedInspectors = (objects: ITemplateObject[]) =>
  ObjectInspectors.allInspectorsList.filter((inspector) =>
    inspector.willBeUsed(objects),
  );

const EditorRightObjects: React.FC = () => {
  const { currentProject, updateSelectedObjects } = useContext(EditorContext);
  return (
    <>
      {currentProject && (
        <>
          {(currentProject.meta?.selection.length || -1) > 0 &&
            (() => {
              const {
                selection: [{ ref }],
              } = currentProject.meta!;
              return (
                <>
                  {ref === "object" &&
                    (() => {
                      const selectedObjects = EditorProject.getSelectedObjects(
                        currentProject,
                      );
                      return (
                        <>
                          <div className={styles.objectInspectorsWrapper}>
                            {getSharedInspectors(selectedObjects).map(
                              (i, idx) => (
                                <Fragment
                                  key={idx}
                                  children={createElement(i.getComponent(), {
                                    objects: selectedObjects,
                                    updateSelectedObjects,
                                  })}
                                />
                              ),
                            )}
                          </div>
                        </>
                      );
                    })()}
                </>
              );
            })()}
          {!currentProject.meta?.selection.length && (
            <>
              <p>Nenhum objeto selecionado.</p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EditorRightObjects;
