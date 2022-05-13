const { Router } = require("express");
const {Diet, Recipe} = require("../db");
const axios = require("axios");
const router = Router();

//APIKEY
const { API_KEY } = process.env;
const { API_KEY_2 } = process.env;
const { API_KEY_3 } = process.env;
const { API_KEY_4 } = process.env;
const { API_KEY_5 } = process.env;
const { API_KEY_6 } = process.env;
const { API_KEY_7 } = process.env;



///////////////////  FUNCIONES CONTROLADORAS  ///////////////////


////////// FUNCION PARA OBTENER LAS RECETAS DE LA API //////////
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const apiData = apiUrl.data?.results.map((e) => {
      return {
        title: e.title,
        id: e.id,
        summary: e.summary.replace(/<[^>]*>?/g, ""),
        steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
        spoonacularScore: e.spoonacularScore,
        healthScore: e.healthScore,
        diets: e.diets,
        image: e.image,
        dishTypes: e.dishTypes,
        //   imageType: e.imageType,
      };
    });
    return apiData;
  } catch (error) {
    console.log(error);
  }
};


////////// FUNCION PARA OBTENER LAS RECETAS DE LA BASE DE DATOS //////////
const getDbInfo = async () => {
  let dbRecipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["title"],  //me traigo el nombre de las dietas
      through: {
        attributes: [],
      },
    },
  });

  return dbRecipes.map((e) => {
    return {
      title: e.title,
      id: e.id,
      summary: e.summary,
      steps: e.steps,
      spoonacularScore: e.spoonacularScore,
      healthScore: e.healthScore,
      diets: e.diets.map((e) => e.title),
      image: e.image,
    };
  });
};


////////// FUNCION PARA COMBINAR LAS RECETAS //////////
const getAllRecipes = async () => {
  const apiData = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiData.concat(dbInfo);
  return infoTotal;
};


router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let totalRecipes = await getAllRecipes();
    //console.log(totalRecipes);
    if (name) {
      let recipesByName = await totalRecipes.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );
      // console.log('este es el title', title)
      // console.log('este es el name', name)
      recipesByName.length
        ? res.status(200).json(recipesByName)
        : res
            .status(404)
            .send(
              `There aren't any recipe with that name`
            );
    } else {
      res.status(200).json(totalRecipes);
    }
  } catch (error) {
    res.status(400).send("Error");
    console.log(error);
  }
});

router.get("/:idReceta", async (req, res) => {
  const { idReceta } = req.params;
  try {
    const recipesDetail = await getAllRecipes();

    if (idReceta) {
      let recipesById = await recipesDetail.filter((e) => e.id == idReceta);
      recipesById.length
        ? res.status(200).json(recipesById)
        : res.status(404).send(`The idReceta is not correct`);
    } else {
      res.status(400).send('No se recibio id')
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;