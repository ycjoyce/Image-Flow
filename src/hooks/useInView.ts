import { RefObject, useEffect } from "react";

let observer: IntersectionObserver;

const callbackMap = new Map();

const handleIntersections = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(({ isIntersecting, intersectionRatio, target }) => {
    const cb = callbackMap.get(target);
    if (!cb) return;
    if (isIntersecting || intersectionRatio > 0) {
      observer.unobserve(target);
      callbackMap.delete(target);
      cb();
    }
  });
};

const getObserver = () => {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      threshold: 0.5
    });
  }
  return observer;
};

const useInView = (el: RefObject<any>, callback: () => void) => {
  useEffect(
    () => {
      const { current: target } = el;
      const observer = getObserver();
      callbackMap.set(target, callback);
      observer.observe(target);
    },
    [callback, el]
  );
};

export default useInView;
