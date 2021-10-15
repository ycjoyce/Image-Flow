import { Photo } from "../models";
import ImageRenderer from "./ImageRenderer";

interface Props extends Photo {
  cardWidth: number;
  position?: { left: number | "auto"; top: number | "auto" };
  onClick: (id: string) => void;
}

const ImageCard = (props: Props) => {
  const { id, width, height, cardWidth, position, onClick } = props;
  const ratio = width / cardWidth;

  return (
    <div
      style={{
        display: "inline-block",
        width: `${cardWidth}px`,
        height: `${height / ratio}px`,
        position: position ? "absolute" : "relative",
        left: position ? `${position.left}px` : "auto",
        top: position ? `${position.top}px` : "auto"
      }}
      onClick={() => onClick(id)}
    >
      <ImageRenderer {...props} thumb={true} />
    </div>
  );
};

export default ImageCard;
