import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useQuery = (param: string, callback: (param: string | null) => void) => {
  const searchParams = new URLSearchParams(useLocation().search);
  const targetParam = searchParams.get(param);

  useEffect(
    () => {
      callback(targetParam);
    },
    [targetParam, callback]
  );
};

export default useQuery;
