import { useState } from "react";
import { useHistory } from "react-router-dom";
import useImages from "../hooks/useImages";
import useQuery from "../hooks/useQuery";
import Search from "./Search";
import ImageFlow from "./ImageFlow";
import Mask from "./Mask";

function Homepage() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const images = useImages(searchTerm);
  const defaultTerm = "sky";

  const onSearchSubmit = (term: string) => {
    setSearchTerm(term);
    history.push("?q=" + term);
  };

  useQuery("q", param => {
    setSearchTerm(param || defaultTerm);
  });

  return (
    <div>
      <Search onSubmit={onSearchSubmit} />
      {images ? (
        <ImageFlow {...images} cardWidth={250} />
      ) : (
        <Mask>Loading</Mask>
      )}
    </div>
  );
}

export default Homepage;
