import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { Photo } from "../models";
import unsplashAPI from "../apis/unsplash";

interface Detail {
  status: "success" | "pending" | number;
  data: Photo | false;
}

const useImageDetail = (id: string): Detail => {
  const history = useHistory();
  const [detail, setDetail] = useState<Detail>({
    status: "pending",
    data: false
  });

  useEffect(
    () => {
      unsplashAPI(`/photos/${id}`)
        .then((res: AxiosResponse) => {
          setDetail({ status: "success", data: res.data });
        })
        .catch((err: AxiosError) => {
          setDetail({ status: err.response!.status, data: false });
        });
    },
    [id, history]
  );

  return detail;
};

export default useImageDetail;
