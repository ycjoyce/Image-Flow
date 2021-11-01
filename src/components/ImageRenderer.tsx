import { useState, createRef, memo } from "react";
import { Blurhash } from "react-blurhash";
import { Photo } from "../models";
import useInView from "../hooks/useInView";

interface Props extends Photo {
  thumb?: boolean;
}

const ImageRenderer = (props: Props) => {
  const { blur_hash, urls: imageURL, description, thumb = false } = props;
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = createRef<HTMLDivElement>();

  const renderPlaceholder = (blur_hash: string | null): JSX.Element => {
    return blur_hash ? (
      <Blurhash hash={blur_hash} width="100%" height="100%" />
    ) : (
      <div style={{ background: "#eee", width: "100%", height: "100%" }} />
    );
  };

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
      <div className="image-renderer">
        <div
          className="image-placeholder"
          style={{
            opacity: loaded ? 0 : 1
          }}
        >
          {renderPlaceholder(blur_hash)}
        </div>
        {inView && (
          <img
            src={imageURL[thumb ? "thumb" : "regular"]}
            alt={description}
            className="image"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    </div>
  );
};

export default memo(ImageRenderer);
