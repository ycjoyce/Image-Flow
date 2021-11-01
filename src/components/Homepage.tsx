import { useState, Fragment, useRef, useEffect, createRef, lazy } from "react";
import { useHistory, useLocation } from "react-router-dom";
import unsplashAPI from "../apis/unsplash";
import useAtBottom from "../hooks/useAtBottom";
import { Photo } from "../models";
import { getRootPath, debounce } from "../util";

interface Props {
  alertMsg?: string;
}

const Mask = lazy(() => import("./Mask"));
const LoadingMask = lazy(() => import("./LoadingMask"));
const Search = lazy(() => import("./Search"));
const ImageFlow = lazy(() => import("./ImageFlow"));

const getImages = async (
  query: string | null,
  page: number,
  per_page: number = 30,
  default_query: string = "sky"
): Promise<[Photo[], number] | false> => {
  try {
    const { data: { results, total_pages } } = await unsplashAPI.get(
      "/search/photos",
      {
        params: {
          query: query || default_query,
          page,
          per_page
        }
      }
    );
    return [results, total_pages];
  } catch {
    return false;
  }
};

const Homepage = (props: Props) => {
  const history = useHistory();
  const imageFlowRef = createRef<HTMLDivElement>();
  const containerRef = createRef<HTMLDivElement>();
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<string>("");
  const [containerWidth, setContainerWidth] = useState(containerRef.current?.clientWidth);
  const search = useLocation().search;
  const q = new URLSearchParams(search).get("q");
  const page = useRef(1);
  const totalPages = useRef(0);
  const { alertMsg = "超過限制請求次數(50次/小時)，請下個小時再試" } = props;
  let imageFlowHeight: number;

  const onSearchSubmit = (term: string) => {
    history.push(`?q=${term}`);
  };

  const loadEnoughImages = () => {
    if (page.current + 1 > totalPages.current) {
      setLoading(false);
      return;
    }
    page.current = page.current + 1;
    !loading && setLoading(true);
    getImages(q, page.current).then(res => {
      if (res === false) {
        setLoading(false);
        setAlert(alertMsg);
        return;
      }
      const [images] = res;
      setAlert("");
      setImages(prevImages => [...prevImages, ...images]);
      setLoading(false);
    });
  };

  const checkHeightEnough = (height: number) => {
    if (height === imageFlowHeight) {
      return;
    }
    imageFlowHeight = height;
    if (height < document.documentElement.clientHeight) {
      loadEnoughImages();
      return;
    }
    setLoading(false);
  };

  const onCardClick = (id: string) => {
    history.push(`${getRootPath(process.env.NODE_ENV)}photo/${id}`);
  };

  useAtBottom(imageFlowRef, loadEnoughImages, 200);

  useEffect(
    () => {
      document.documentElement.scrollTop = 0;
      page.current = 1;
      setLoading(true);
      
      getImages(q, page.current).then(res => {
        if (res === false) {
          setLoading(false);
          setAlert(alertMsg);
          return;
        }
        const [images, total_pages] = res;
        setImages(images);
        totalPages.current = total_pages;
      });

      return () => {
        setAlert("");
        setImages([]);
      };
    },
    [q]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeHandler = (target: HTMLElement) => {
      setContainerWidth(target.clientWidth);
    };
    const onResize = debounce(resizeHandler.bind(null, containerRef.current));
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [containerRef]);

  return (
    <div ref={containerRef}>
      {loading && <LoadingMask />}
      {alert && (
        <Mask>
          <p className="mask-text text-white letter-spacing-lg">{alert}</p>
        </Mask>
      )}
      {images.length > 0 && (
        <Fragment>
          <Search defaultValue={q || ""} onSubmit={onSearchSubmit} />
          <ImageFlow
            ref={imageFlowRef}
            images={images}
            containerWidth={containerWidth}
            gap={10}
            getHeight={checkHeightEnough}
            onCardClick={onCardClick}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Homepage;
