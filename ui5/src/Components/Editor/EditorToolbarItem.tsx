import { createElement } from "react";
import styles from "./Editor.module.css";

export type IEditorToolbarItemProps = {
  isSelected?: boolean;
} & React.LiHTMLAttributes<HTMLLIElement>;

export const EditorToolbarItem: React.FC<IEditorToolbarItemProps> = ({
  className,
  isSelected,
  ...props
}) =>
  createElement("li", {
    className: `${className} ${styles.editorToolbarItem} ${
      isSelected ? styles.active : ""
    }`,
    ...props,
  });
