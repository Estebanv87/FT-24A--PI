import {
  FILTER_BY_DIETS,
  GET_RECIPES,
  ALPHABETIC_ORDER,
  TITLE_RECIPES,
  POST_RECIPE,
  DIET_TYPES,
  ORDER_SCORE,
  GET_DETAILS,
  REMOVE_DETAILS,
  ERROR,
  REMOVE_RECIPE,
} from "../actions/actionType";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
  error:""
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
        error:""
      };
      
      case TITLE_RECIPES:
        return {
          ...state,
          recipes: payload,
          error:""
        };

    case FILTER_BY_DIETS:
      const allRecipes = state.allRecipes;
      const dietsFilter =
        payload === "all"
          ? allRecipes
          : allRecipes.filter((e) =>
              e.diets.find((el) => el.includes(payload))
            );
      return {
        ...state,
        recipes: dietsFilter,
      };

      case DIET_TYPES:
        return {
          ...state,
          diets: payload,
        };

        case POST_RECIPE:
          return {
            ...state,
          };
    
    case ALPHABETIC_ORDER:
      let alphabeticalOrder =
        payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) return 1;
              if (b.title > a.title) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) return -1;
              if (b.title > a.title) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: alphabeticalOrder,
      };

    case ORDER_SCORE:
      let scoreOrder =
        payload === "high"
          ? state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) return 1;
              if (b.spoonacularScore > a.spoonacularScore) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) return -1;
              if (b.spoonacularScore > a.spoonacularScore) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: scoreOrder,
      };




    case GET_DETAILS:
      return {
        ...state,
        detail: payload
      };
      case REMOVE_DETAILS:
        return {
          ...state,
          detail: []
        };

      case ERROR:
        return {
          ...state,
          error: payload
        }
      
      case REMOVE_RECIPE:
        return {
          ...state,
          allRecipes: [],
          recipes: []
        }

    default:
      return state;
  }
}


// case FILTER_CREATED:
    //   const createdFilter =
    //     payload === "created"
    //       ? state.allRecipes.filter((e) => e.createInDb)
    //       : state.allRecipes.filter((e) => !e.createInDb);
    //   return {
    //     ...state,
    //     recipes: payload === "all" ? state.allRecipes : createdFilter,
    //   };