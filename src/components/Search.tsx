import { useState, FormEvent, useEffect, memo } from "react";

type Props = {
  className?: string;
  defaultValue?: string;
  onSubmit: (term: string) => void;
};

const Search = (props: Props) => {
  const { defaultValue, className, onSubmit } = props;
  const [term, setTerm] = useState("");

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchTerm = term.trim();
    if (!searchTerm) return;
    onSubmit(searchTerm);
  };

  useEffect(
    () => {
      if (defaultValue !== undefined) {
        setTerm(defaultValue);
      }
    },
    [defaultValue]
  );

  return (
    <form
      className={`search-bar d-flex ${className || ""}`}
      onSubmit={onFormSubmit}
    >
      <input
        type="text"
        value={term}
        aria-label="Enter keywords"
        className="form-controller flex-grow-1"
        onChange={e => setTerm(e.target.value)}
      />
      <button aria-label="Search" className="btn btn-primary flex-shrink-0">
        <i className="fas fa-search text-white" />
      </button>
    </form>
  );
};

export default memo(Search);
