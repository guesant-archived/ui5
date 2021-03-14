export class ProjectAssets {
  static getPlaceholderImage = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => `https://picsum.photos/${width}/${height}`;
  static isValidImage = (url: string) =>
    new Promise<boolean>((resolve) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(true));
      image.addEventListener("error", () => resolve(false));
      image.src = url;
    }).catch(() => false);
}
