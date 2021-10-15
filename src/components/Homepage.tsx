import { useState, Fragment, useRef, useEffect, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import unsplashAPI from "../apis/unsplash";
import useAtBottom from "../hooks/useAtBottom";
import LoadingMask from "./LoadingMask";
import Search from "./Search";
import ImageFlow from "./ImageFlow";
import { Photo } from "../models";

const getImages = async (
  query: string | null,
  page: number,
  per_page: number = 100,
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
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const search = useLocation().search;
  const q = new URLSearchParams(search).get("q");
  const page = useRef(1);
  const totalPages = useRef(0);
  const imageFlowRef = createRef<HTMLDivElement>();
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
    }
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
        setLoading(false);
      });

      return () => setImages([]);
    },
    [q]
  );

  return (
    <div>
      {loading && <LoadingMask />}
      {images.length > 0 && (
        <Fragment>
          <Search defaultValue={q || ""} onSubmit={onSearchSubmit} />
          <ImageFlow
            ref={imageFlowRef}
            images={images}
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
