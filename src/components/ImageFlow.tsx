import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  ForwardedRef,
  useMemo
} from "react";
import usePrevious from "../hooks/usePrevious";
import { Photo } from "../models";
import PositionedCard from "./PositionedCard";

type Props = {
  containerWidth?: number;
  cardWidth?: number;
  gap?: number;
  images: Photo[];
  getHeight?: (height: number) => void;
  onCardClick?: (id: string) => void;
};

const ImageFlow = (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    containerWidth = document.documentElement.clientWidth,
    cardWidth = 200,
    gap = 10,
    images,
    getHeight
  } = props;

  const [itemAmountPerRow, setItemAmountPerRow] = useState(
    Math.floor((containerWidth + gap) / (cardWidth + gap)) || 1
  );

  const columns = useRef({
    prev: Array.from({ length: itemAmountPerRow }, (): Photo[] => []),
    new: Array.from({ length: itemAmountPerRow }, (): Photo[] => [])
  });

  const columnHeight = useRef(
    Array.from({ length: itemAmountPerRow }, () => 0)
  );

  const renderCards = (
    images: (Photo | undefined)[]
  ): (JSX.Element | null)[] => {
    return images.map((image, idx, arr) => {
      if (!image) return null;

      return (
        <PositionedCard
          key={image.id}
          {...image}
          cardWidth={cardWidth}
          gap={gap}
          itemAmountPerRow={itemAmountPerRow}
          idx={idx}
          images={arr}
          onClick={props.onCardClick}
        />
      );
    });
  };

  const prevItemAmountPerRow = usePrevious(itemAmountPerRow) as Number;

  const prevImageList = useRef<(Photo | undefined)[]>([]);

  const imageList = useMemo<(Photo | undefined)[]>(
    () => {
      const recognizeImageArray = (
        prevImageArr: (Photo | undefined)[],
        newColumns: Photo[][]
      ): (Photo | undefined)[] => {
        const result = prevImageArr.slice();
        const oldColumns = columns.current.prev;
        let longestColumnLength = 0;
        let oldShortestColumnLength = Infinity;

        for (let i = 0; i < itemAmountPerRow; i++) {
          if (
            oldColumns[i].length + newColumns[i].length >
            longestColumnLength
          ) {
            longestColumnLength = oldColumns[i].length + newColumns[i].length;
          }
          if (oldColumns[i].length < oldShortestColumnLength) {
            oldShortestColumnLength = oldColumns[i].length;
          }
          for (
            let j = oldShortestColumnLength - 1;
            j < longestColumnLength;
            j++
          ) {
            if (j < 0) continue;
            result[itemAmountPerRow * j + i] = newColumns[i][j];
          }
        }

        return result;
      };

      const orderImages = (images: Photo[], cardWidth: number): Photo[][] => {
        columns.current.prev = JSON.parse(JSON.stringify(columns.current.new));

        images.forEach((image, idx) => {
          if (image) {
            const row = Math.floor(idx / itemAmountPerRow) + 1;
            const column =
              (idx + 1) % itemAmountPerRow === 0
                ? itemAmountPerRow
                : (idx + 1) % itemAmountPerRow;
            const height = image.height / (image.width / cardWidth);

            if (row === 1) {
              columns.current.new[column - 1].push(image);
              columnHeight.current[column - 1] += height;
            } else {
              const minIdx = columnHeight.current.findIndex(
                e => e === Math.min(...columnHeight.current)
              );
              columns.current.new[minIdx].push(image);
              columnHeight.current[minIdx] += height;
            }
          }
        });

        return columns.current.new;
      };

      const resetColumns = () => {
        columnHeight.current = Array.from(
          { length: itemAmountPerRow },
          () => 0
        );
        columns.current = {
          prev: Array.from({ length: itemAmountPerRow }, (): Photo[] => []),
          new: Array.from({ length: itemAmountPerRow }, (): Photo[] => [])
        };
      };

      const getImageList = (images: Photo[]): (Photo | undefined)[] => {
        if (itemAmountPerRow !== prevItemAmountPerRow) {
          resetColumns();
          return recognizeImageArray(
            [],
            orderImages(images.map(img => img), cardWidth)
          );
        }

        const newImages = images.filter(
          e => !prevImageList.current.find(img => img && img.id === e.id)
        );

        if (newImages.length > 0) {
          return recognizeImageArray(
            prevImageList.current,
            orderImages(newImages, cardWidth)
          );
        }

        return [...prevImageList.current];
      };

      const result = getImageList(images);

      prevImageList.current = result;

      return result;
    },
    [images, itemAmountPerRow, prevItemAmountPerRow, cardWidth]
  );

  useEffect(
    () => {
      setItemAmountPerRow(
        Math.floor(Math.floor((containerWidth + gap) / (cardWidth + gap))) || 1
      );
      if (getHeight) {
        getHeight(Math.max(...columnHeight.current));
      }
    },
    [containerWidth, gap, cardWidth, getHeight]
  );

  return (
    <div
      ref={ref}
      className="image-flow"
      style={{
        width: `${cardWidth * itemAmountPerRow +
          gap * (itemAmountPerRow - 1)}px`,
        height: `${Math.max(...columnHeight.current)}px`
      }}
    >
      {renderCards(imageList)}
    </div>
  );
};

export default forwardRef(ImageFlow);
