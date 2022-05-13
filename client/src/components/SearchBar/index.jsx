import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTitleRecipes } from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getTitleRecipes(title.toLocaleLowerCase()));
      setTitle("");
    }
  

  return (
    <div>
      <input
        id="inputName"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInput(e)}
      />
      <button
        className="buttonSearch"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
