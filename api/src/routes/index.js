const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const { TypeOfDiet, Recipe } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//APIKEY
//const { API_KEY2 } = process.env;
const { API_KEY } = process.env;


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


const getDbInfo = async () => {
  let dbRecipes = await Recipe.findAll({
    include: {
      model: TypeOfDiet,
      attributes: ["title"],
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
      TypeOfDiet: e.TypeOfDiet.map((e) => e.title),
      image: e.image,
    };
  });
};

//FUNCION PARA COMBINAR LAS RECETAS
const getAllRecipes = async () => {
  const apiData = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiData.concat(dbInfo);
  return infoTotal;
};


router.get("/recipes", async (req, res) => {
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

router.get("/recipes/:idReceta", async (req, res) => {
  const { idReceta } = req.params;
  try {
    const recipesDetail = await getAllRecipes();

    if (idReceta) {
      let recipesById = await recipesDetail.filter((e) => e.id == idReceta);
      recipesById.length
        ? res.status(200).json(recipesById)
        : res.status(404).send(`The idReceta is not correct`);
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const recipesTypesInfo = await axios.get(
      " `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`"
    );
    const types = recipesTypesInfo.data?.results.map((e) => e.diets);
    const newTypes = types.flat().concat("Vegetarian", "Ketogenic");
    const typesResult = [...new Set(newTypes)];

    for (let e in typesResult) {
      TypeOfDiet.findOrCreate({
        where: {
          title: typesResult[e],
        },
      });
    }
    const newDiets = await TypeOfDiet.findAll();
    res.status(200).json(newDiets);
  } catch (error) {
    console.log(error);
  }
});

router.post("/recipe", async (req, res) => {
  let {
    title,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    image,
    diets
  } = req.body;
  
  try {

    let newRecipe = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image
    });

      diets.forEach (async (e) => {
      let typeOfDietDb = await TypeOfDiet.findAll({
        where: {
          title: e
        },
      });
      await newRecipe.addDiets(typeOfDietDb);
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(404).send(`Cannot create a new recipe`);
    console.log(error);
  }
});
      




module.exports = router;
