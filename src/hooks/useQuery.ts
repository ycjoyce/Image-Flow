import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const useQuery = (param: string, callback: (param: string | null) => void) => {
  const history = useHistory();
  const { location: { search } } = history;
  const searchParams = new URLSearchParams(search);
  const targetParam = searchParams.get(param);

  useEffect(
    () => {
      callback(targetParam);
    },
    [targetParam, callback]
  );
};

export default useQuery;
