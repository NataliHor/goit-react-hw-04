import css from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter a search term!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    onSearch(query);
    setQuery("");
  }

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          <CiSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
}
