import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import unsplashAPI from "../apis/unsplash";

const useImageDetail = (id: string) => {
  const history = useHistory();
  const [detail, setDetail] = useState(null);

  useEffect(
    () => {
      const getImageDetail = async () => {
        try {
          const { data } = await unsplashAPI(`/photos/${id}`);
          setDetail(data);
        } catch (e) {
          history.push("/");
        }
      };
      getImageDetail();
    },
    [id, history]
  );

  return detail;
};

export default useImageDetail;
