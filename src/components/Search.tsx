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
    <form onSubmit={onFormSubmit}>
      <input type="text" value={term} onChange={e => setTerm(e.target.value)} />
      <button>
        <i className="fas fa-search" />
      </button>
    </form>
  );
}

export default Search;
