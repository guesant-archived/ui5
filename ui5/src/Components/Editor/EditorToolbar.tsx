import { useModal } from "@guesant/ui5-lib";
import { createElement, Fragment, useContext, useEffect } from "react";
import styles from "./Editor.module.css";
import {
  EditorToolbarItem,
  IEditorToolbarItemProps,
} from "./EditorToolbarItem";
import { EditorContext } from "./Hooks/EditorContext";
import { IModalComponent } from "./Modals/IModalComponent";

type SupportedToolbarModals = null;

// Toolbar

const ToolbarItemNull: IToolbarItem = [{}, null];

const ToolbarItems: IToolbarItem[] = [
  ToolbarItemNull,
];

type IToolbarItem =
  | [IEditorToolbarItemProps, SupportedToolbarModals | null]
  | [IEditorToolbarItemProps];

// End Toolbar

// Modals

const ToolbarModals: IToolbarModalItem[] = [
];

type IToolbarModalItem =
  | [IModalComponent, SupportedToolbarModals]
  | [IModalComponent, SupportedToolbarModals, { validProject?: boolean }];

// End Modals

const EditorToolbar = () => {
  const { currentProject } = useContext(EditorContext);

  const {
    isOpened,
    setOpenedModal,
    openActionCreator,
    openedModal,
  } = useModal<SupportedToolbarModals>();

  useEffect(() => {
    currentProject === null && setOpenedModal(null);
  }, [currentProject, openedModal, setOpenedModal]);

  return (
    <div className={styles.editorToolbar}>
      <ul className={styles.iconsList}>
        {ToolbarItems.map(([props, action], idx) => (
          <Fragment
            key={action || "key" + idx + Math.random()}
            children={
              <EditorToolbarItem
                {...(action
                  ? {
                      isSelected: isOpened(action),
                      onClick: () =>
                        openActionCreator(action)(
                          currentProject !== null ? true : false,
                        ),
                    }
                  : {})}
                {...props}
              />
            }
          />
        ))}
      </ul>
      {ToolbarModals.map(([component, name, config]) => (
        <Fragment
          key={name}
          children={createElement(component, {
            isOpen: config?.validProject
              ? currentProject !== null && isOpened(name)
              : isOpened(name),
            setIsOpen: openActionCreator(name),
          })}
        />
      ))}
    </div>
  );
};

export default EditorToolbar;
