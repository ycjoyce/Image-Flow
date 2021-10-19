import { useState, FormEvent, useEffect } from "react";

interface Props {
  defaultValue?: string;
  onSubmit: (term: string) => void;
}

function Search(props: Props) {
  const { defaultValue, onSubmit } = props;
  const [term, setTerm] = useState("");

  useEffect(
    () => {
      if (defaultValue !== undefined) {
        setTerm(defaultValue);
      }
    },
    [defaultValue]
  );

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchTerm = term.trim();
    if (!searchTerm) return;
    onSubmit(searchTerm);
  };

  return (
    <form className="search-bar d-flex" onSubmit={onFormSubmit}>
      <input
        type="text"
        value={term}
        className="form-controller flex-grow-1"
        onChange={e => setTerm(e.target.value)}
      />
      <button className="btn btn-primary flex-shrink-0">
        <i className="fas fa-search text-white" />
      </button>
    </form>
  );
}

export default Search;
