import { useState, createRef } from "react";
import { Blurhash } from "react-blurhash";
import { Photo } from "../models";
import useInView from "../hooks/useInView";

interface Props extends Photo {
  thumb?: boolean;
}

const ImageRenderer = (props: Props) => {
  const { blur_hash, urls: imageURL, description, thumb = false } = props;
  const [inView, setInView] = useState(false);
  const ref = createRef<HTMLDivElement>();

  useInView(ref, () => {
    setInView(true);
  });

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute"
      }}
    >
      {inView ? (
        <img
          src={imageURL[thumb ? "thumb" : "regular"]}
          alt={description}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      ) : (
        <Blurhash hash={blur_hash} width="100%" height="100%" />
      )}
    </div>
  );
};

export default ImageRenderer;
