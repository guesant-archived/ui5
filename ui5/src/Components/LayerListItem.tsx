import styles from "./LayerListItem.module.css";

export type ILayerListItemProps = {
  isSelected?: boolean;
} & React.LiHTMLAttributes<HTMLLIElement>;

const LayerListItem: React.FC<ILayerListItemProps> = ({
  isSelected,
  ...props
}) => {
  return (
    <li
      className={[
        styles.layerListItem,
        ...(isSelected ? [styles.selected] : []),
      ].join(" ")}
      {...props}
    />
  );
};

export default LayerListItem;
