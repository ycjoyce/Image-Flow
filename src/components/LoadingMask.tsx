import { memo } from "react";
import Mask from "./Mask";

const LoadingMask = () => {
  return (
    <Mask>
      <p className="mask-text text-white letter-spacing-lg">LOADING</p>
    </Mask>
  );
};

export default memo(LoadingMask);
