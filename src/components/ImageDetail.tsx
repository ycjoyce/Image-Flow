import { Fragment, useEffect, useState, lazy } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import useImageDetail from "../hooks/useImageDetail";
import { getRootPath } from "../util";
import { Photo, Tag } from "../models";

interface Props {
  alertMsg?: string;
}

const ImageRenderer = lazy(() => import("./ImageRenderer"));
const LoadingMask = lazy(() => import("./LoadingMask"));
const Mask = lazy(() => import("./Mask"));

const ImageDetail = (props: Props) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { status, data } = useImageDetail(id);
  const [alert, setAlert] = useState<string>("");
  const { alertMsg = "超過限制請求次數(50次/小時)，將導回首頁" } = props;

  const renderTags = (tags: Tag[]): JSX.Element[] => {
    return tags.map(tag => (
      <Link
        key={tag.title}
        className="image-tag-item"
        to={`${getRootPath(process.env.NODE_ENV)}?q=${tag.title}`}
      >
        {tag.title}
      </Link>
    ));
  };

  const renderContent = (data: Photo): JSX.Element => {
    const { description, alt_description, tags_preview, width, height } = data;

    return (
      <main className="image-detail">
        {(description || alt_description) && (
          <div className="image-desc-list">
            {description && (
              <p className="image-desc-item main">{description}</p>
            )}
            {alt_description && (
              <p className="image-desc-item sub">{alt_description}</p>
            )}
          </div>
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

  useEffect(
    () => {
      let timer: NodeJS.Timer;
      if (status !== "success" && status !== "pending") {
        setAlert(alertMsg);
        timer = setTimeout(() => {
          setAlert("");
          history.push("/");
        }, 1500);
      }
      return () => clearTimeout(timer);
    },
    [data, status, history, alertMsg]
  );

  return (
    <Fragment>
      {data ? (
        <Fragment>{renderContent(data)}</Fragment>
      ) : alert ? (
        <Mask>
          <p className="mask-text text-white letter-spacing-lg">{alert}</p>
        </Mask>
      ) : (
        <LoadingMask />
      )}
    </Fragment>
  );
};

export default ImageDetail;
