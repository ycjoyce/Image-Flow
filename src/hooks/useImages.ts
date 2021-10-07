import { useState, useEffect } from "react";
import unsplashAPI from "../apis/unsplash";
import { Photo } from "../models";

const useImages = (
  query: string,
  page: number = 1,
  per_page: number = 100
): [images: Photo[], totalPages: number] => {

  const [images, setImages] = useState([] as Photo[]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(
    () => {
      if (page === 1) {
        setImages([]);
      }

      const getImages = async () => {
        if (!query) {
          return;
        }
        const {
          data: { total_pages, results: images }
        } = await unsplashAPI.get("/search/photos", {
          params: {
            query,
            per_page,
            page
          }
        });
        setImages(prevImages => [...prevImages, ...images]);
        if (page === 1) {
          setTotalPages(total_pages);
        }
      };

      getImages();
    },
    [query, per_page, page, totalPages]
  );

  return [images, totalPages];
};

export default useImages;
