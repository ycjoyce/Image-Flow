import { useHistory } from "react-router-dom";
import { Photo } from "../models";
import ImageCard from "./ImageCard";

interface Props {
  cardWidth: number;
  total: number;
  total_pages: number;
  results: Photo[];
}

function ImageFlow(props: Props) {
  const history = useHistory();

  const onCardClick = (id: string) => {
    history.push(`/photo/${id}`);
  };

  const renderCards = (images: Photo[]) => {
    return images.map((image, idx) => {
      return (
        <ImageCard
          key={image.id}
          {...image}
          cardWidth={250}
          onClick={onCardClick}
        />
      );
    });
  };

  return <div>{renderCards(props.results)}</div>;
}

export default ImageFlow;
