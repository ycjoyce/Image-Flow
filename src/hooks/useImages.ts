import { useState, useEffect } from "react";
import unsplashAPI from "../apis/unsplash";

const useImages = (query: string, per_page: number = 100) => {
  const [images, setImages] = useState(null);

  useEffect(
    () => {
      setImages(null);
      const getImages = async () => {
        const { data: images } = await unsplashAPI.get("/search/photos", {
          params: {
            query,
            per_page
          }
        });
        setImages(images);
      };
      getImages();
    },
    [query, per_page]
  );

  return images;
};

export default useImages;
