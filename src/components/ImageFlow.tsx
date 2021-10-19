import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  ForwardedRef
} from "react";
import { useHistory } from "react-router-dom";
import { Photo } from "../models";
import ImageCard from "./ImageCard";

interface Props {
  containerWidth?: number;
  cardWidth?: number;
  gap?: number;
  images: Photo[];
  getHeight?: (height: number) => void;
}

const ImageFlow = forwardRef(function(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const history = useHistory();
  const {
    containerWidth = document.documentElement.clientWidth,
    cardWidth = 250,
    images: propsImages,
    gap = 10
  } = props;
  const [images, setImages] = useState<(Photo | undefined)[]>([]);
  const [itemAmountPerRow, setItemAmountPerRow] = useState(
    Math.floor((containerWidth + gap) / (cardWidth + gap))
  );
  const itemAmountPerRowChanged = useRef<boolean>(false);
  const columnHeight = useRef(
    Array.from({ length: itemAmountPerRow }, () => 0)
  );
  const columns = useRef({
    prev: Array.from({ length: itemAmountPerRow }, (): Photo[] => []),
    new: Array.from({ length: itemAmountPerRow }, (): Photo[] => [])
  });
  const imagesBeforeResize = useRef<(Photo | undefined)[]>([]);

  const onCardClick = (id: string) => {
    history.push(`/photo/${id}`);
  };

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

  const renderCards = (
    images: (Photo | undefined)[]
  ): (JSX.Element | null)[] => {
    return images.map((image, idx, arr) => {
      if (!image) return null;
      return (
        <ImageCard
          key={image.id}
          {...image}
          cardWidth={cardWidth}
          position={getCardPosition(idx, arr)}
          onClick={onCardClick}
        />
      );
    });
  };

  const recognizeImageArray = useCallback(
    (
      prevImageArr: (Photo | undefined)[],
      newColumns: Photo[][]
    ): (Photo | undefined)[] => {
      const result = prevImageArr.slice();
      const oldColumns = columns.current.prev;
      let longestColumnLength = 0;
      let oldShortestColumnLength = Infinity;

      for (let i = 0; i < itemAmountPerRow; i++) {
        if (oldColumns[i].length + newColumns[i].length > longestColumnLength) {
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
    },
    [itemAmountPerRow]
  );

  const orderImages = useCallback(
    (images: (Photo | undefined)[], cardWidth: number): Photo[][] => {
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
    },
    [columnHeight, itemAmountPerRow]
  );

  const resetImages = useCallback(
    (prevImages: (Photo | undefined)[]) => {
      columnHeight.current = Array.from({ length: itemAmountPerRow }, () => 0);
      columns.current = {
        prev: Array.from({ length: itemAmountPerRow }, (): Photo[] => []),
        new: Array.from({ length: itemAmountPerRow }, (): Photo[] => [])
      };

      setImages(
        recognizeImageArray(
          [],
          orderImages(prevImages.filter(img => img), cardWidth)
        )
      );
    },
    [cardWidth, itemAmountPerRow, orderImages, recognizeImageArray]
  );

  const onResize = () => {
    const newItemsPerRow = Math.floor(
      Math.floor((containerWidth + gap) / (cardWidth + gap))
    );
    if (newItemsPerRow !== itemAmountPerRow) {
      setItemAmountPerRow(newItemsPerRow);
      itemAmountPerRowChanged.current = true;
    }
  };

  useEffect(
    () => {
      onResize();
    },
    [containerWidth]
  );

  useEffect(
    () => {
      setImages(prevImages => {
        const newImages = propsImages.filter(
          e => !prevImages.find(img => img && img.id === e.id)
        );
        if (newImages.length > 0) {
          return recognizeImageArray(
            prevImages,
            orderImages(newImages, cardWidth)
          );
        }
        return [...prevImages];
      });
    },
    [propsImages]
  );

  useEffect(
    () => {
      if (!itemAmountPerRowChanged.current) {
        return;
      }
      imagesBeforeResize.current = images.filter(img => img);
      setImages([]);
    },
    [itemAmountPerRow]
  );

  useEffect(
    () => {
      if (images.length === 0 && itemAmountPerRowChanged.current) {
        resetImages(imagesBeforeResize.current);
      }
    },
    [images.length]
  );

  useEffect(
    () => {
      if (!props.getHeight) return;
      props.getHeight(Math.max(...columnHeight.current));
    },
    [Math.max(...columnHeight.current)]
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
      {containerWidth > cardWidth + gap && renderCards(images)}
    </div>
  );
});

export default ImageFlow;
