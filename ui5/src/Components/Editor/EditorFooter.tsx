import React from "react";
import styles from "./Editor.module.css";

const AnchorNewTab: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  ...props
}) => <a target="blank" rel="noopener noreferer" children="" {...props} />;

const EditorFooter = () => {
  return (
    <div className={styles.editorFooter}>
      <div className={styles.editorFooterWrapper}>
        <p>
          <AnchorNewTab href="https://github.com/guesant/ui5/blob/dev/LICENSE">
            MIT
          </AnchorNewTab>{" "}
          |{" "}
          <AnchorNewTab href="https://github.com/guesant">
            Gabriel Rodrigues
          </AnchorNewTab>{" "}
          - 2021 |{" "}
          <AnchorNewTab href="https://github.com/guesant/ui5">
            GitHub
          </AnchorNewTab>
        </p>
      </div>
    </div>
  );
};

export default EditorFooter;
