import { useState, FormEvent } from "react";

interface Props {
  onSubmit: (term: string) => void;
}

function Search(props: Props) {
  const [term, setTerm] = useState("");

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchTerm = term.trim();
    if (!searchTerm) return;
    props.onSubmit(searchTerm);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" value={term} onChange={e => setTerm(e.target.value)} />
      <button>
        <i className="fas fa-search" />
      </button>
    </form>
  );
}

export default Search;
