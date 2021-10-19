import { useState, Fragment, useRef, useEffect, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import unsplashAPI from "../apis/unsplash";
import useAtBottom from "../hooks/useAtBottom";
import LoadingMask from "./LoadingMask";
import Search from "./Search";
import ImageFlow from "./ImageFlow";
import { Photo } from "../models";
import { debounce } from "../util";

const getImages = async (
  query: string | null,
  page: number,
  per_page: number = 300,
  default_query: string = "sky"
): Promise<[Photo[], number]> => {
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
    return [[], 0];
  }
};

const Homepage = () => {
  const history = useHistory();
  const imageFlowRef = createRef<HTMLDivElement>();
  const containerRef = createRef<HTMLDivElement>();
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState(containerRef.current?.clientWidth);
  const search = useLocation().search;
  const q = new URLSearchParams(search).get("q");
  const page = useRef(1);
  const totalPages = useRef(0);
  let imageFlowHeight = 0;

  const onSearchSubmit = (term: string) => {
    history.push(`?q=${term}`);
  };

  const loadEnoughImages = () => {
    if (page.current + 1 > totalPages.current) {
      return;
    }
    page.current = page.current + 1;
    setLoading(true);
    getImages(q, page.current).then(res => {
      const [images] = res;
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

  useAtBottom(imageFlowRef, loadEnoughImages, 200);

  useEffect(
    () => {
      document.documentElement.scrollTop = 0;
      page.current = 1;
      setLoading(true);
      getImages(q, page.current).then(res => {
        const [images, total_pages] = res;
        setImages(images);
        totalPages.current = total_pages;
      });

      return () => setImages([]);
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
  }, []);

  return (
    <div ref={containerRef}>
      {loading && <LoadingMask />}
      {images.length > 0 && (
        <Fragment>
          <Search defaultValue={q || ""} onSubmit={onSearchSubmit} />
          <ImageFlow
            ref={imageFlowRef}
            images={images}
            containerWidth={containerWidth}
            cardWidth={150}
            gap={10}
            getHeight={checkHeightEnough}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Homepage;
