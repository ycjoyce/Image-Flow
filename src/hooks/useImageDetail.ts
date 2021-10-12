import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Photo } from "../models";
import unsplashAPI from "../apis/unsplash";

const useImageDetail = (id: string): Photo | false | undefined => {
  const history = useHistory();
  const [detail, setDetail] = useState<Photo | false>();

  useEffect(
    () => {
      const getImageDetail = async () => {
        try {
          const { data } = await unsplashAPI(`/photos/${id}`);
          setDetail(data);
        } catch (e) {
          setDetail(false);
        }
      };
      getImageDetail();
    },
    [id, history]
  );

  return detail;
};

export default useImageDetail;
