import { Fragment, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import useImageDetail from "../hooks/useImageDetail";
import { Photo, Tag } from "../models";
import ImageRenderer from "./ImageRenderer";
import LoadingMask from "./LoadingMask";

const ImageDetail = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const data = useImageDetail(id);

  useEffect(
    () => {
      if (data === false) {
        history.push("/");
      }
    },
    [data, history]
  );

  const renderTags = (tags: Tag[]): JSX.Element[] => {
    return tags.map(tag => (
      <Link key={tag.title} className="image-tag-item" to={`/?q=${tag.title}`}>
        {tag.title}
      </Link>
    ));
  };

  const renderContent = (data: Photo): JSX.Element => {
    const { description, alt_description, tags_preview, width, height } = data;

    return (
      <main className="image-detail">
        {(description || alt_description) && (
          <article className="image-desc-list">
            {description && (
              <p className="image-desc-item main">{description}</p>
            )}
            {alt_description && (
              <p className="image-desc-item sub">{alt_description}</p>
            )}
          </article>
        )}
        {tags_preview && (
          <div className="image-tag-list">{renderTags(tags_preview)}</div>
        )}
        <div
          style={{
            width: "100%",
            paddingBottom: `${height / width * 100}%`,
            position: "relative"
          }}
        >
          <ImageRenderer {...data} />
        </div>
      </main>
    );
  };

  return (
    <Fragment>
      {data ? <Fragment>{renderContent(data)}</Fragment> : <LoadingMask />}
    </Fragment>
  );
};

export default ImageDetail;
