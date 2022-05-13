const { Router } = require("express");
const {Diet} = require("../db")
const axios = require("axios");
const router = Router();

const { API_KEY } = process.env;
const { API_KEY_2 } = process.env;
const { API_KEY_3 } = process.env;
const { API_KEY_4 } = process.env;
const { API_KEY_5 } = process.env;
const { API_KEY_6 } = process.env;
const { API_KEY_7 } = process.env;

router.get('/', async (req, res) => {
    try {
      const recipesTypesInfo = await axios.get(
         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      );
      const types = recipesTypesInfo.data?.results.map((e) => e.diets);
      const newTypes = types.flat().concat("Vegetarian", "Ketogenic");
      const typesResult = [...new Set(newTypes)];
  
      for (let e in typesResult) {
          Diet.findOrCreate({
          where: {
            title: typesResult[e],
          },
        });
      }
      const newDiets = await Diet.findAll();
      res.status(200).json(newDiets);
    } catch (error) {
      console.log(error);
    }
  });
  
  module.exports = router;