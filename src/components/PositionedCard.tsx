import { useMemo } from "react";
import { Photo } from "../models";
import ImageCard, { Props as ImageCardProps } from "./ImageCard";

interface Props extends ImageCardProps {
  idx: number;
  images: (Photo | undefined)[];
  itemAmountPerRow: number;
  gap: number;
  cardWidth: number;
}

const PositionedCard = (props: Props) => {
  const { idx, images, itemAmountPerRow, gap, cardWidth } = props;

  const position = useMemo(
    () => {
      const getCardPosition = (
        idx: number,
        images: (Photo | undefined)[]
      ): { left: number; top: number } => {
        const row = Math.floor(idx / itemAmountPerRow) + 1;
        const column =
          (idx + 1) % itemAmountPerRow === 0
            ? itemAmountPerRow
            : (idx + 1) % itemAmountPerRow;
        const left = column === 1 ? 0 : (gap + cardWidth) * (column - 1);
        let top = 0;

        for (let i = row - 1; i >= 1; i--) {
          const target = images[idx - itemAmountPerRow * i];
          if (row === 1 || !target) break;
          top += target.height / (target.width / cardWidth) + gap;
        }

        return { left, top };
      };

      return getCardPosition(idx, images);
    },
    [idx, images, cardWidth, gap, itemAmountPerRow]
  );

  return <ImageCard {...props} position={position} />;
};

export default PositionedCard;
