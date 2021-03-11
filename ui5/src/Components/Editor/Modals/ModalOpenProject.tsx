import { LoadProject } from "@guesant/ui5-lib";
import { useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "../Hooks/EditorContext";
import { IModalComponent } from "./IModalComponent";

export const ModalOpenProject: IModalComponent = ({ isOpen, setIsOpen }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const { setProjects, projects, setCurrentProjectIndex } = useContext(
    EditorContext,
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.click();
      setIsOpen(false);
    }
  }, [setIsOpen, isOpen, inputRef]);

  useEffect(() => {
    (async () => {
      if (files.length === 0) return;
      setFiles([]);
      const loadedProjects = await LoadProject.fromBlobArray(files);
      setProjects([...projects, ...loadedProjects]);
      setCurrentProjectIndex(projects.length + (loadedProjects.length - 1));
    })();
  }, [files, projects, setCurrentProjectIndex, setProjects]);

  return (
    <>
      <div style={{ display: "none" }}>
        <input
          multiple
          type="file"
          ref={inputRef}
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />
      </div>
    </>
  );
};
