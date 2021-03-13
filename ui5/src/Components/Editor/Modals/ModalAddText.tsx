import {
  ContentSwitcher,
  Modal,
  Switch,
  TextArea,
  TextInput,
} from "carbon-components-react";
import { fabric } from "fabric";
import immer from "immer";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "../Hooks/EditorContext";
import { IModalComponent } from "./IModalComponent";
import styles from "./ModalAddText.module.css";

const MODE_TEXT = 1;
const MODE_TEXTBOX = 0;

export const ModalAddText: IModalComponent = ({ isOpen, setIsOpen }) => {
  const [[idFieldTextArea, idFieldTextInput]] = useState(() => [
    nanoid(),
    nanoid(),
  ]);
  const [textBoxContent, setTextBoxContent] = useState("TextBox");
  const { currentProject, updateCurrentProject } = useContext(EditorContext);
  const [mode, setMode] = useState<typeof MODE_TEXTBOX | typeof MODE_TEXT>(
    MODE_TEXTBOX,
  );

  const addObject = () => {
    if (currentProject) {
      const object = ((textContent: string) => {
        switch (mode) {
          case MODE_TEXT:
            return new fabric.Textbox(textContent || "Text");
          case MODE_TEXTBOX:
            return new fabric.Textbox(textContent || "TextBox");
        }
      })(textBoxContent.trim());
      updateCurrentProject(
        immer(currentProject, (draft) => {
          draft.model.fabricExported.objects.push(object.toJSON());
        }),
      );
    }
  };

  useEffect(() => {
    isOpen === false && setMode(MODE_TEXTBOX);
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
    setTextBoxContent("");
  }

  function handleSubmit() {
    addObject();
    closeModal();
  }

  return (
    <>
      <Modal
        className={styles.modalAddTextBox}
        open={isOpen}
        onRequestClose={closeModal}
        primaryButtonText="Adicionar"
        modalHeading="Adicionar Text"
        secondaryButtonText="Cancelar"
        onRequestSubmit={handleSubmit}
        primaryButtonDisabled={currentProject === null}
      >
        <div className={styles.general}>
          <ContentSwitcher
            selectedIndex={mode}
            selectionMode="manual"
            onChange={({ index }) => void setMode(index as any)}
          >
            <Switch name="textbox" text="TextBox" />
            <Switch name="text" text="Text" />
          </ContentSwitcher>

          {mode === MODE_TEXTBOX && (
            <>
              <div>
                <TextArea
                  hideLabel
                  labelText="Conteúdo"
                  placeholder="Conteúdo"
                  value={textBoxContent}
                  id={"id" + idFieldTextArea}
                  onChange={(e) => setTextBoxContent(e.target.value)}
                  onBlur={(e) => setTextBoxContent(e.target.value.trim())}
                />
              </div>
            </>
          )}

          {mode === MODE_TEXT && (
            <>
              <div>
                <TextInput
                  hideLabel
                  labelText="Conteúdo"
                  placeholder="Conteúdo"
                  value={textBoxContent}
                  id={"id" + idFieldTextInput}
                  onChange={(e) => setTextBoxContent(e.target.value)}
                  onBlur={(e) => setTextBoxContent(e.target.value.trim())}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
