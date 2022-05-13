const { Router } = require("express");
const {Diet, Recipe} = require("../db");
const router = Router();

router.post("/", async (req, res) => {
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
        let DietDb = await Diet.findAll({
          where: {
            title: e
          },
        });
        await newRecipe.addDiets(DietDb);
      });
      res.status(200).json(newRecipe);
    } catch (error) {
      res.status(404).send(`Cannot create a new recipe`);
      console.log(error);
    }
  });
        
  
  
  
  
  module.exports = router;