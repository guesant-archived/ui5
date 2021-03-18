import { EditorProject, IEditorProject } from "@guesant/ui5-lib";
import LayerListItem, { ILayerListItemProps } from "../LayerListItem";
import { IHandleClick } from "./EditorLeft";

export type ObjectsListProps = {
  project: IEditorProject;
  handleClick?: IHandleClick;
} & ILayerListItemProps;

export const EditorLeftObjectsList: React.FC<ObjectsListProps> = ({
  project,
  handleClick,
  ...props
}) => (
  <>
    {project.model.fabricExported.objects.map(({ type, ...i }, idx) => (
      <LayerListItem
        key={i.meta?.id ?? idx}
        children={type ?? "Objeto"}
        onClick={handleClick?.(idx)}
        isSelected={EditorProject.isSelected(project)("object", idx)}
        {...props}
      />
    ))}
  </>
);
