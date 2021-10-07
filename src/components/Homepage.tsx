import { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import useImages from "../hooks/useImages";
import useQuery from "../hooks/useQuery";
import useAtBottom from "../hooks/useAtBottom";
import Search from "./Search";
import ImageFlow from "./ImageFlow";
import Mask from "./Mask";

function Homepage() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [images, totalPages] = useImages(searchTerm, page);
  const defaultTerm = "sky";

  const onSearchSubmit = (term: string) => {
    setSearchTerm(term);
    setPage(1);
    history.push("?q=" + term);
  };

  useQuery("q", param => {
    setSearchTerm(param || defaultTerm);
  });

  useAtBottom(() => {
    setPage(prevPage => (prevPage + 1 < totalPages ? prevPage + 1 : prevPage));
  });

  return (
    <div>
      <Search onSubmit={onSearchSubmit} />
      {images.length ? (
        <Fragment>
          <ImageFlow images={images} cardWidth={250} />
        </Fragment>
      ) : (
        <Mask>Loading</Mask>
      )}
    </div>
  );
}

export default Homepage;
