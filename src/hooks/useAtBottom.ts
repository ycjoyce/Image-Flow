import { useCallback, useEffect } from "react";
import { debounce } from "../util";

const useAtBottom = (
  ref: {current: any},
  callback: () => void,
  distance: number = 100,
) => {
  const handler = useCallback(() => {
    const lowEnough = () => {
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight
      );
      const viewportHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      return pageHeight - viewportHeight - scrollTop < distance;
    }
    if (lowEnough() && ref?.current) {
      callback();
    }
  },[callback, distance, ref]);

  useEffect(
    () => {
      const onEvent = debounce(handler, 800);
      window.addEventListener("scroll", onEvent);
      window.addEventListener("resize", onEvent);

      return () => {
        window.removeEventListener("scroll", onEvent);
        window.removeEventListener("resize", onEvent);
      };
    },
    [handler]
  );
};

export default useAtBottom;
