import { ITemplateStaticImage } from "@fantastic-images/core/dist/types/ITemplateStaticImage";
import { IEditorProject, ProjectAssets } from "@guesant/ui5-lib";
import { Modal, Select, SelectItem, TextInput } from "carbon-components-react";
import immer from "immer";
import { nanoid } from "nanoid";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "../Hooks/EditorContext";
import { IModalComponent } from "./IModalComponent";
import styles from "./ModalAddStaticImage.module.css";

const getDefaultStaticImage = (): ITemplateStaticImage => ({
  url: "",
  position: "back",
});

type ISubFieldProps = {
  currentProject: IEditorProject | null;
  staticImageData: ITemplateStaticImage;
  setStaticImageData: (data: ITemplateStaticImage) => void;
};

const AddStaticImagePosition: React.FC<ISubFieldProps> = ({
  staticImageData,
  setStaticImageData,
}) => {
  const [idFieldSelect] = useState(nanoid);
  return (
    <>
      <Select
        labelText="Posição"
        id={"id" + idFieldSelect}
        value={staticImageData.position}
        onChange={(e) => {
          setStaticImageData(
            immer(staticImageData, (draft) => {
              draft.position = e.target.value as "back" | "front";
            }),
          );
        }}
      >
        <SelectItem text="back" value="back" />
        <SelectItem text="front" value="front" />
      </Select>
    </>
  );
};

const AddStaticImageContent: React.FC<ISubFieldProps> = ({
  currentProject,
  staticImageData,
  setStaticImageData,
}) => {
  const [idFieldURL] = useState(nanoid);
  const refInputFile = useRef<HTMLInputElement>(null);
  const { width = 200, height = 200 } = currentProject?.model.sketch || {};

  const setURL = useCallback(
    (url: string) => {
      if (url !== staticImageData.url) URL.revokeObjectURL(staticImageData.url);
      setStaticImageData(
        immer(staticImageData, (draft) => void (draft.url = url)),
      );
    },
    [setStaticImageData, staticImageData],
  );

  useEffect(() => {
    if (refInputFile.current && staticImageData.url.length === 0) {
      refInputFile.current.value = "";
    }
  }, [staticImageData]);

  return (
    <>
      <TextInput
        required
        type="url"
        title="URL da Imagem"
        id={"id" + idFieldURL}
        labelText="URL da Imagem"
        value={staticImageData.url}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setURL(e.target.value)}
        onBlur={(e) => setURL(e.target.value.trim())}
        placeholder={ProjectAssets.getPlaceholderImage({ width, height })}
      />
      <p>ou...</p>
      <input
        type="file"
        ref={refInputFile}
        onChange={async (e) => {
          try {
            const file = e.target.files?.[0];
            if (file) {
              const blobURL = URL.createObjectURL(file);
              if (await ProjectAssets.isValidImage(blobURL)) setURL(blobURL);
            }
          } catch (_) {}
          e.target.value = "";
        }}
        accept="image/jpeg,image/png,image/svg+xml"
      />
    </>
  );
};

export const ModalAddStaticImage: IModalComponent = ({ isOpen, setIsOpen }) => {
  const { currentProject, updateCurrentProject } = useContext(EditorContext);
  const [staticImageData, setStaticImageData] = useState<ITemplateStaticImage>(
    getDefaultStaticImage,
  );

  const addStaticImage = useCallback(() => {
    if (currentProject) {
      const { url, position } = staticImageData;
      const { width = 200, height = 200 } = currentProject.model.sketch;
      updateCurrentProject(
        immer(currentProject, (draft) => {
          draft.model.staticImages.push({
            position,
            url:
              url.trim() ||
              ProjectAssets.getPlaceholderImage({ width, height }),
          });
        }),
      );
    }
  }, [currentProject, staticImageData, updateCurrentProject]);

  useEffect(() => void setStaticImageData(getDefaultStaticImage()), [isOpen]);

  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

  const handleSubmit = useCallback(() => {
    addStaticImage();
    closeModal();
  }, [addStaticImage, closeModal]);

  return (
    <>
      <Modal
        open={isOpen}
        onRequestClose={closeModal}
        primaryButtonText="Adicionar"
        onRequestSubmit={handleSubmit}
        secondaryButtonText="Cancelar"
        modalHeading="Adicionar StaticImage"
        className={styles.modalAddStaticImage}
        primaryButtonDisabled={currentProject === null}
        children={
          <>
            <form>
              <div className={styles.formWrapper}>
                <AddStaticImagePosition
                  currentProject={currentProject}
                  staticImageData={staticImageData}
                  setStaticImageData={setStaticImageData}
                />
                <AddStaticImageContent
                  currentProject={currentProject}
                  staticImageData={staticImageData}
                  setStaticImageData={setStaticImageData}
                />
              </div>
            </form>
          </>
        }
      />
    </>
  );
};
