import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesByDiets,
  orderScore,
  alphabeticOrder,
} from "../../redux/actions";
import Card from "../Card";
import NavBar from "../NavBar";
import Paginado from "../Paginado";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const recetas = useSelector((state) => state.allRecipes);
  const notFound = useSelector((state) => state.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage /*setRecipesPerPage*/] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [/*order*/, setOrder] = useState("");

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleFilterDiets(e) {
    dispatch(filterRecipesByDiets(e.target.value));
  }

  function handleAlphabeticOrder(e) {
    e.preventDefault();
    dispatch(alphabeticOrder(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleScoreOrder(e) {
    e.preventDefault();
    dispatch(orderScore(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className="home">
      <NavBar />

      <div>
        <div className="filters">
          <select
            className="filter1"
            defaultValue="sortAlphabetical"
            onChange={(e) => handleAlphabeticOrder(e)}
          >
            <option value="sortAlphabetical" select disabled>
              Sort Alphabetical
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className="filter2"
            defaultValue="sortByScore"
            onChange={(e) => handleScoreOrder(e)}
          >
            <option value="sortByScore" select disabled>
              Sort By Score
            </option>
            <option value="high">HIGHEST SCORE</option>
            <option value="low">LOWEST SCORE</option>
          </select>

          <select
            className="filter3"
            defaultValue="sortByDiet"
            onChange={(e) => handleFilterDiets(e)}
          >
            <option value="sortByDiet" select disabled>
              Sort By Diet
            </option>
            <option value="all">ALL</option>
            <option value="dairy free">DAIRY FREE</option>
            <option value="gluten free">GLUTEN FREE</option>
            <option value="lacto ovo vegetarian">LACTO-OVOVEGETARIAN</option>
            <option value="fodmap friendly">LOW FODMAP</option>
            <option value="paleolithic">PALEOLITHIC</option>
            <option value="pescatarian">PESCATARIAN</option>
            <option value="primal">PRIMAL</option>
            <option value="vegan">VEGAN</option>
            <option value="whole 30">WHOLE30</option>
          </select>
        </div>
        <div className="paginado">
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
          />
        </div>
        <div>
          {recetas.length === 0 ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : notFound.length === 0 && allRecipes.length > 0 ? (
            <div className="card_container">
              {currentRecipes?.map((e) => {
                return (
                  <Fragment>
                    <Card
                      title={e.title}
                      image={e.image}
                      diets={e.diets.join(", ")}
                      id={e.id}
                      key={e.id}
                    />
                  </Fragment>
                );
              })}
            </div>
          ) : (
            <p>Not recipe Found</p>
          )}
        </div>
      </div>
    </div>
  );
}
