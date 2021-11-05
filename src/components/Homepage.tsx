import { useReducer, useEffect, useRef, Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useNodeWidth from "../hooks/useNodeWidth";
import usePrevious from "../hooks/usePrevious";
import { Photo } from "../models";
import unsplashAPI from "../apis/unsplash";
import { getRootPath } from "../util";
import Mask from "./Mask";
import LoadingMask from "./LoadingMask";
import Search from "./Search";
import ImageFlow from "./ImageFlow";
import useInView from "../hooks/useInView";

type Props = {
  alertMsg?: string;
};

type State = {
  page: number;
  total_pages: number;
  loading: boolean;
  alert: string;
  images: Photo[];
};

enum ImagesAction {
  INIT_IMAGES,
  LOAD_MORE_IMAGES,
  SUCCESS_IMAGES,
  FAILURE_IMAGES,
  IMAGES_LOADED
}

type Action =
  | { type: ImagesAction.INIT_IMAGES }
  | {
      type: ImagesAction.LOAD_MORE_IMAGES;
      payload: { page: number };
    }
  | {
      type: ImagesAction.SUCCESS_IMAGES;
      payload: { images: Photo[]; total_pages?: number; page: number };
    }
  | { type: ImagesAction.FAILURE_IMAGES; payload: { alert: string } }
  | { type: ImagesAction.IMAGES_LOADED };

const initialState: State = {
  page: 1,
  total_pages: 0,
  loading: true,
  alert: "",
  images: []
};

const imagesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ImagesAction.INIT_IMAGES:
      return { ...state, page: 1, loading: true, alert: "", images: [] };
    case ImagesAction.LOAD_MORE_IMAGES:
      return { ...state, loading: true, page: action.payload.page };
    case ImagesAction.SUCCESS_IMAGES:
      return {
        ...state,
        alert: "",
        loading: false,
        page: action.payload.page,
        total_pages: action.payload.total_pages || state.total_pages,
        images:
          action.payload.page === 1
            ? [...action.payload.images]
            : [...state.images, ...action.payload.images]
      };
    case ImagesAction.FAILURE_IMAGES:
      return { ...state, loading: false, alert: action.payload.alert };
    case ImagesAction.IMAGES_LOADED:
      return { ...state, loading: false };
    default:
      throw new Error("imagesReducer 沒有此種 type");
  }
};

const getImages = async (
  query: string | null,
  page: number,
  per_page: number = 30,
  default_query: string = "sky"
): Promise<{ images: Photo[]; total_pages: number }> => {
  try {
    const { data: { results: images, total_pages } } = await unsplashAPI.get(
      "/search/photos",
      {
        params: {
          query: query || default_query,
          page,
          per_page
        }
      }
    );
    return Promise.resolve({ images, total_pages });
  } catch {
    return Promise.reject();
  }
};

const Homepage = (props: Props) => {
  const { alertMsg = "超過限制請求次數(50次/小時)，請下個小時再試" } = props;
  const history = useHistory();
  const [containerWidth, containerRef] = useNodeWidth();
  const imageFlowBottomRef = useRef<HTMLDivElement>(null);
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("q");
  const prevQuery = usePrevious(query);

  const [{ page, total_pages, loading, alert, images }, dispatch] = useReducer(
    imagesReducer,
    initialState
  );

  const onSearchSubmit = (term: string) => {
    history.push(`?q=${term}`);
  };

  const loadEnoughImages = () => {
    if (page + 1 > total_pages) {
      dispatch({ type: ImagesAction.IMAGES_LOADED });
      return;
    }

    dispatch({
      type: ImagesAction.LOAD_MORE_IMAGES,
      payload: { page: page + 1 }
    });
  };

  const onCardClick = (id: string) => {
    history.push(
      `/${getRootPath(process.env.NODE_ENV)}${
        process.env.NODE_ENV === "production" ? "/" : ""
      }photo/${id}`
    );
  };

  useEffect(
    () => {
      if (query !== prevQuery) {
        document.documentElement.scrollTop = 0;
        dispatch({ type: ImagesAction.INIT_IMAGES });
      }
    },
    [query, prevQuery]
  );

  useEffect(
    () => {
      if (query !== prevQuery && page !== 1) {
        return;
      }

      getImages(query, page)
        .then(res => {
          dispatch({
            type: ImagesAction.SUCCESS_IMAGES,
            payload: { ...res, page }
          });
        })
        .catch(() => {
          dispatch({
            type: ImagesAction.FAILURE_IMAGES,
            payload: { alert: alertMsg }
          });
        });
    },
    [prevQuery, query, page, alertMsg]
  );

  useInView(imageFlowBottomRef, loadEnoughImages);

  return (
    <div
      ref={containerRef}
      className="d-flex flex-direction-column height-viewport"
    >
      {loading && !alert && <LoadingMask />}
      {alert && (
        <Mask>
          <p className="mask-text text-white letter-spacing-lg">{alert}</p>
        </Mask>
      )}
      {images.length > 0 && (
        <Fragment>
          <Search
            defaultValue={query || ""}
            onSubmit={onSearchSubmit}
            className="flex-shrink-0"
          />
          <div className="image-flow-container flex-1 scroll-y">
            <ImageFlow
              images={images}
              containerWidth={containerWidth}
              gap={10}
              onCardClick={onCardClick}
            />
            {!loading && <div ref={imageFlowBottomRef} />}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Homepage;
