import { Fragment } from "react";
import { useParams } from "react-router-dom";
import useImageDetail from "../hooks/useImageDetail";
import { Photo, Tag } from "../models";
import ImageRenderer from "./ImageRenderer";
import LoadingMask from "./LoadingMask";

const ImageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const data = useImageDetail(id) as null | Photo;

  const renderTags = (tags: Tag[]): JSX.Element[] => {
    return tags.map(tag => <div key={tag.title}>{tag.title}</div>);
  };

  const renderContent = (data: Photo): JSX.Element => {
    const { description, alt_description, tags_preview } = data;
    let { width, height } = data;

    return (
      <Fragment>
        <div
          style={{
            width: "100%",
            paddingBottom: `${height / width * 100}%`,
            position: "relative"
          }}
        >
          <ImageRenderer {...data} />
        </div>
        <article>
          {description && <p>{description}</p>}
          {alt_description && <p>{alt_description}</p>}
        </article>
        {tags_preview && <div>{renderTags(tags_preview)}</div>}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {data ? <Fragment>{renderContent(data)}</Fragment> : <LoadingMask />}
    </Fragment>
  );
};

export default ImageDetail;
