import { useRef, useEffect } from "react";

const usePrevious = (value: any) => {
  const prevValue = useRef(value);
  useEffect(() => {
    prevValue.current = value;
  });
  return prevValue.current;
};

export default usePrevious;
