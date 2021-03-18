import { ISupportedPositions } from "@fantastic-images/core/dist/types/ITemplateStaticImage";
import { EditorProject, IEditorProject } from "@guesant/ui5-lib";
import LayerListItem from "../LayerListItem";
import { IHandleClick } from "./EditorLeft";
import { Template } from "@fantastic-images/core";

export type IEditorLeftStaticListProps = {
  project: IEditorProject;
  position: ISupportedPositions;
  handleClick?: IHandleClick;
};

export const EditorLeftStaticList: React.FC<IEditorLeftStaticListProps> = ({
  project,
  position,
  handleClick,
}) => {
  const _isSelected = EditorProject.isSelected(project);
  return (
    <>
      {Template.getStaticSorted(project, position).map(([, idx]) => (
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
