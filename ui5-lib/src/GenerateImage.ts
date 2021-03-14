export class GenerateImage {
  static getPlaceholderImage = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => `https://picsum.photos/${width}/${height}`;
}
