import { Photo } from "../models";
import ImageRenderer from "./ImageRenderer";

interface Props extends Photo {
  cardWidth: number;
  onClick: (id: string) => void;
}

const ImageCard = (props: Props) => {
  const { id, width, height, cardWidth, onClick } = props;
  const ratio = width / cardWidth;

  return (
    <div
      style={{
        display: "inline-block",
        width: `${cardWidth}px`,
        height: `${height / ratio}px`,
        position: "relative"
      }}
      onClick={() => onClick(id)}
    >
      <ImageRenderer {...props} thumb={true} />
    </div>
  );
};

export default ImageCard;
