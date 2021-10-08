import { useHistory } from "react-router-dom";
import { Photo } from "../models";
import ImageCard from "./ImageCard";

interface Props {
  cardWidth: number;
  images: Photo[];
}

function ImageFlow(props: Props) {
  const history = useHistory();

  const onCardClick = (id: string) => {
    history.push(`/photo/${id}`);
  };

  const renderCards = (images: Photo[]): JSX.Element[] =>
    images.map(image => (
      <ImageCard
        key={image.id}
        {...image}
        cardWidth={250}
        onClick={onCardClick}
      />
    ));

  return <div>{renderCards(props.images)}</div>;
}

export default ImageFlow;
