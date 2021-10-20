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
      cb(isIntersecting, intersectionRatio);
    }
  });
};

const getObserver = () => {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      threshold: 0.8
    });
  }
  return observer;
};

const useInView = (
  el: RefObject<any>,
  callback: (isIntersecting?: boolean, intersectionRatio?: number) => void
) => {
  useEffect(
    () => {
      try {
        const { current: target } = el;
        const observer = getObserver();
        callbackMap.set(target, callback);
        observer.observe(target);

        return () => {
          observer.unobserve(target);
          callbackMap.delete(target);
        };
      } catch (e) {
        console.error(e);
      }
    },
    [callback, el]
  );
};

export default useInView;
