import { IEditorProject } from "@guesant/ui5-lib";
import { Modal, NumberInput, TextInput } from "carbon-components-react";
import immer from "immer";
import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { EditorContext } from "../Hooks/EditorContext";
import { IModalComponent } from "./IModalComponent";
import styles from "./ModalNewProject.module.css";

const DEFAULT_PROJECT: IEditorProject = {
  meta: { name: "Novo Projeto", selection: [] },
  model: {
    sketch: { width: 500, height: 420 },
    staticImages: [],
    fabricExported: { objects: [] },
  },
};

export const ModalNewProject: IModalComponent = ({ isOpen, setIsOpen }) => {
  const [[idFieldName, idFieldDimensions]] = useState(() => [
    nanoid(),
    nanoid(),
  ]);
  const { projects, updateProject, setCurrentProjectIndex } = useContext(
    EditorContext,
  );
  const [newProjectData, setNewProjectData] = useState(DEFAULT_PROJECT);

  function handleSubmit() {
    if (updateProject(projects.length, newProjectData)) {
      setCurrentProjectIndex(projects.length);
      setIsOpen(false);
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        modalHeading="Novo Projeto"
        secondaryButtonText="Cancelar"
        primaryButtonText="Criar Novo Projeto"
        onRequestClose={() => setIsOpen(false)}
        onRequestSubmit={handleSubmit}
        className={styles.modalNewProject}
      >
        <div className={styles.grid}>
          <div className={styles.gridFull}>
            <TextInput
              placeholder="Projeto"
              id={"id" + idFieldName}
              labelText="Nome do Projeto"
              value={newProjectData.meta!.name || ""}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                setNewProjectData(
                  immer(newProjectData, (draft) => {
                    draft.meta!.name = e.target.value;
                  }),
                );
              }}
              onBlur={(e) => {
                setNewProjectData(
                  immer(newProjectData, (draft) => {
                    draft.meta!.name = e.target.value.trim();
                  }),
                );
              }}
            />
          </div>
          {([
            ["Largura", "width"],
            ["Altura", "height"],
          ] as const).map(([labelText, dimensionKey]) => (
            <div key={dimensionKey} className={styles.gridHalf}>
              <NumberInput
                label={labelText}
                style={{ width: "100%" }}
                placeholder={dimensionKey}
                onFocus={(e) => e.target.select()}
                value={newProjectData.model.sketch[dimensionKey] || 0}
                onChange={(e: any) => {
                  setNewProjectData(
                    immer(newProjectData, (draft) => {
                      // TODO: change imaginaryTarget to targer after IBM's NumberInput bug be fixed.
                      draft.model.sketch[dimensionKey] = +e.imaginaryTarget
                        .value;
                    }),
                  );
                }}
                id={"id" + idFieldDimensions + dimensionKey}
              />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
