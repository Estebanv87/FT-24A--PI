import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getTypeOfDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./CreateRecipe.css";

function validate(input) {
  let errors = {};

  if (!/^[a-zA-Z\s]*$/.test(input.title))
    errors.title = "Invalid name. Only Letters";
  if (!input.title) {
    errors.title = "Please insert a Name to create a Recipe";
  }
  if (!input.summary) {
    errors.summary = "Please insert a Summary to create a Recipe";
  }
  if (input.spoonacularScore < 0 || input.spoonacularScore > 100 || /^[a-zA-Z\s]*$/.test(input.spoonacularScore)) {
    errors.spoonacularScore = "Please insert a number 1 to 100";
  }
  if (input.healthScore < 0 || input.healthScore > 100 || /^[a-zA-Z\s]*$/.test(input.healthScore)) {
    errors.healthScore = "Please insert a number 1 to 100";
  }
  return errors;
}

function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    steps: [],
    diets: [],
  });

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckBox(e) {
    const clicked = diets
      .filter((el) => e.target.value === el.title)
      .map((el) => el.title);
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, ...clicked],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((e) => e !== clicked[0]),
      });
    }
  }

  function handleStep(e) {
    setInput({
      ...input,
      steps: [e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("New recipe created");

    setInput({
      title: "",
      image: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      steps: [],
      diets: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getTypeOfDiets());
  }, [dispatch]);

  return (
    <div className="formContainer">
      <h1 className="title_create">Create Recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
          <div>
            <label>NAME:</label>
            <input
              type="string"
              value={input.title}
              name="title"
              onChange={(e) => handleInput(e)}
            />
            {errors.title && <h5>{errors.title}</h5>}
          </div>
          <div>
            <label>IMAGE:</label>
            <input
              type="url"
              value={input.image}
              name="image"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div>
            <label>SCORE:</label>
            <input
              type="number"
              value={input.spoonacularScore}
              name="spoonacularScore"
              onChange={(e) => handleInput(e)}
            />
            {errors.spoonacularScore && <h5>{errors.spoonacularScore}</h5>}
          </div>
          <div>
            <label>HEALT SCORE:</label>
            <input
              type="number"
              value={input.healthScore}
              name="healthScore"
              onChange={(e) => handleInput(e)}
            />
            {errors.healthScore && <h5>{errors.healthScore}</h5>}
          </div>

          <div>
            <label>SUMMARY:</label>
            <input
              type="text"
              value={input.summary}
              name="summary"
              onChange={(e) => handleInput(e)}
            />
            {errors.summary && <h5>{errors.summary}</h5>}
          </div>

          <div>
            <label>STEPS:</label>
            <input
              className="textarea"
              type="text"
              value={input.steps}
              name="steps"
              onChange={(e) => handleStep(e)}
              id="steps"
            />
          </div>
        </div>
        <div className="tipoDeDietas">
          <div>
            <label>DIETS:</label>
            <div className="opciones">
              {diets.map((e) => (
                <div className="box">
                  <input
                    className="box2"
                    type="checkbox"
                    value={e.title}
                    name={e.title}
                    onChange={(e) => handleCheckBox(e)}
                  />
                  <h3>{e.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {errors.title ||
        errors.summary ||
        errors.spoonacularScore ||
        errors.healthScore  ? (
          <button className="createButton2" select disabled type="submit">
            Create Recipe
          </button>
        ) : (
          <button className="createButton" type="submit">
            Create Recipe
          </button>
        )}
      </form>
      <div className="returnButton">
        <Link
          to="/home"
          
        >
          <p>Back Home</p>
        </Link>
      </div>
    </div>
  );
}

export default CreateRecipe;
