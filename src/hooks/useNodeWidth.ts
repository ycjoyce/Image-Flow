import { useState, useCallback, RefCallback } from "react";

const useNodeWidth = (): [number, RefCallback<HTMLElement>] => {
  const [width, setWidth] = useState(0);
  const ref = useCallback(node => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    if (node) {
      resizeObserver.observe(node);
    }
  }, []);

  return [width, ref];
};

export default useNodeWidth;
