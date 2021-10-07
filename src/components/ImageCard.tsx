import { useState, createRef, Fragment } from "react";
import { Blurhash } from "react-blurhash";
import { Photo } from "../models";
import useInView from "../hooks/useInView";

interface Props extends Photo {
  cardWidth: number;
  onClick: (id: string) => void;
}

const ImageCard = (props: Props) => {
  const {
    blur_hash,
    urls: { thumb: imageURL },
    description,
    width,
    height,
    cardWidth
  } = props;

  const ratio = width / cardWidth;

  const ref = createRef<HTMLDivElement>();

  const [inView, setInView] = useState(false);

  useInView(ref, () => {
    setInView(true);
  });

  return (
    <div
      ref={ref}
      style={{
        display: "inline-block",
        width: `${cardWidth}px`,
        height: `${height / ratio}px`,
        position: "relative"
      }}
    >
      <Fragment>
        <Blurhash hash={blur_hash} width="100%" height="100%" />
        {inView && (
          <img
            src={imageURL}
            alt={description}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
            onClick={() => props.onClick(props.id)}
          />
        )}
      </Fragment>
    </div>
  );
};

export default ImageCard;
