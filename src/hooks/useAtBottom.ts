import { useEffect } from "react";

const useAtBottom = (callback: () => void) => {
  useEffect(
    () => {
      const onScroll = () => {
        const isBottom =
          document.documentElement.scrollTop +
            document.documentElement.clientHeight >=
          document.documentElement.scrollHeight;
        if (isBottom) {
          callback();
        }
      };

      window.addEventListener("scroll", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    },
    [callback]
  );
};

export default useAtBottom;
