import { ISupportedPositions } from "@fantastic-images/core/dist/types/ITemplateStaticImage";
import { EditorProject, IEditorProject } from "@guesant/ui5-lib";
import { Array as ArrayUtils } from "@guesant/utils";
import LayerListItem from "../LayerListItem";
import { IHandleClick } from "./EditorLeft";

export type IEditorLeftStaticListProps = {
  project: IEditorProject;
  position: ISupportedPositions;
  handleClick?: IHandleClick;
};

export const EditorLeftStaticList: React.FC<IEditorLeftStaticListProps> = ({
  position,
  handleClick,
  project,
}) => {
  const _isSelected = EditorProject.isSelected(project);
  return (
    <>
      {ArrayUtils.mapWithIndex(project.model.staticImages)
        .filter(([i]) => i.position === position)
        .map(([, idx]) => (
          <LayerListItem
            children="@ Imagem Estática"
            onClick={handleClick?.(idx)}
            key={[position, "static", idx].join("-")}
            isSelected={_isSelected("static", idx)}
          />
        ))}
    </>
  );
};
