import { memo } from "react";
import { Photo } from "../models";
import ImageRenderer from "./ImageRenderer";

export interface Props extends Photo {
  cardWidth: number;
  position?: { left: number | "auto"; top: number | "auto" };
  onClick?: (id: string) => void;
}

const ImageCard = (props: Props) => {
  const { id, width, height, position, onClick } = props;
  const cardWidth = props.cardWidth < 0 ? 200 : props.cardWidth;
  const ratio = width / cardWidth;

  return (
    <div
      className="image-card"
      style={{
        width: `${cardWidth}px`,
        height: `${height / ratio}px`,
        position: position ? "absolute" : "relative",
        left: position ? `${position.left}px` : "auto",
        top: position ? `${position.top}px` : "auto"
      }}
      onClick={() => onClick && onClick(id)}
    >
      <ImageRenderer {...props} thumb={true} />
    </div>
  );
};

export default memo(ImageCard);
