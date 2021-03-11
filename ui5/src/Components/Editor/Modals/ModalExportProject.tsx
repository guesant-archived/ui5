import { IEditorProject } from "@guesant/ui5-lib";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Modal,
  TextInput,
} from "carbon-components-react";
import { saveAs } from "file-saver";
import immer from "immer";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import slug from "slug";
import { EditorContext } from "../Hooks/EditorContext";
import { IModalComponent } from "./IModalComponent";

const getProjectFilename = (
  project: IEditorProject | null,
  projectIndex: number,
) => slug(project?.meta?.name?.trim?.() ?? "") || `project-${projectIndex + 1}`;

const DEFAULT_OPTIONS = {
  compress: true,
  filename: "project.json",
};

export const ModalExportProject: IModalComponent = ({ isOpen, setIsOpen }) => {
  const [[idFieldName, idFieldCompress]] = useState(() => [nanoid(), nanoid()]);

  const { currentProject, currentProjectIndex } = useContext(EditorContext);
  const [exportOptions, setExportOptions] = useState(DEFAULT_OPTIONS);

  useEffect(() => {
    if (isOpen === false) setExportOptions(DEFAULT_OPTIONS);
  }, [isOpen]);

  const [prevProjectName, setPrevProjectName] = useState<string | null>(null);

  useEffect(() => {
    if (currentProject?.meta?.name !== prevProjectName) {
      setExportOptions(
        immer(exportOptions, (draft) => {
          draft.filename =
            getProjectFilename(currentProject, currentProjectIndex) + ".json";
        }),
      );
      setPrevProjectName(currentProject?.meta?.name || null);
    }
  }, [currentProject, currentProjectIndex, exportOptions, prevProjectName]);

  function downloadProject() {
    if (currentProject) {
      const projectData = exportOptions.compress
        ? JSON.stringify(currentProject)
        : JSON.stringify(currentProject, null, 2);
      saveAs(
        new Blob([projectData], {
          type: "application/json;charset=utf-8",
        }),
        exportOptions.filename,
      );
      setIsOpen(false);
    }
  }

  return (
    <>
      <Modal
        open={currentProject !== null && isOpen}
        secondaryButtonText="Cancelar"
        modalHeading="Expotar Projeto"
        primaryButtonText="Exportar Projeto"
        onRequestClose={() => setIsOpen(false)}
        onRequestSubmit={() => downloadProject()}
      >
        <div>
          <TextInput
            id={"id" + idFieldName}
            labelText="Nome do arquivo"
            value={exportOptions.filename}
            onFocus={(e) => {
              ((el) => {
                if (el.value.endsWith(".json")) {
                  el.setSelectionRange(0, el.value.length - 5);
                } else {
                  el.select();
                }
              })(e.target);
            }}
            onChange={(e) => {
              setExportOptions(
                immer(
                  exportOptions,
                  (draft) => void (draft.filename = e.target.value),
                ),
              );
            }}
            onBlur={(e) => {
              setExportOptions(
                immer(
                  exportOptions,
                  (draft) => void (draft.filename = e.target.value.trim()),
                ),
              );
            }}
          />
        </div>
        <div style={{ height: "0.5rem" }}></div>
        <Accordion>
          <AccordionItem open title="Otimizações">
            <div>
              <Checkbox
                id={"id" + idFieldCompress}
                labelText="Comprimir Projeto"
                checked={exportOptions.compress}
                onChange={() => {
                  setExportOptions(
                    immer(
                      exportOptions,
                      (draft) => void (draft.compress = !draft.compress),
                    ),
                  );
                }}
              />
            </div>
          </AccordionItem>
        </Accordion>
      </Modal>
    </>
  );
};
