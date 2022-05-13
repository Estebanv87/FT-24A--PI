import axios from "axios";
import {
  GET_RECIPES,
  FILTER_BY_DIETS,
  ALPHABETIC_ORDER,
  TITLE_RECIPES,
  DIET_TYPES,
  ORDER_SCORE,
  GET_DETAILS,
  ERROR,
  REMOVE_DETAILS,
  REMOVE_RECIPE
} from "./actionType";

export function getRecipes() {
    return async function(dispatch) {
        const res = await axios.get("http://localhost:3001/recipes", {});
        return dispatch({ type: GET_RECIPES, payload: res.data });
    };
}

export function getTitleRecipes(payload) {
    return async function (dispatch) {
        
            var json = await axios.get(
                `http://localhost:3001/recipes?name=${payload}`
                );
                if(json.data.length === 0) {
                  dispatch({
                    type: ERROR,
                    payload: 'Not recipe found'
                  });
                }
                return dispatch({
                    type: TITLE_RECIPES,
                    payload: json.data,
                });
            } 
        
    }
    
    export function getTypeOfDiets() {
      return async function (dispatch) {
        var types = await axios.get("http://localhost:3001/types", {});
        return dispatch({ type: DIET_TYPES, payload: types.data });
      };
    }

    export function postRecipe(payload) {
        return async function (dispatch) {
          var post = await axios.post("http://localhost:3001/recipe", payload);
          return post;
        };
      }

    export function filterRecipesByDiets(payload) {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}


export function alphabeticOrder(payload) {
    return {
      type: ALPHABETIC_ORDER,
      payload,
    };
  }

  export function orderScore(payload) {
    return {
        type: ORDER_SCORE,
        payload
    }
}

export function getDetails(id) {
    return async function(dispatch) {
        try {
            const det = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: GET_DETAILS,
                payload: det.data
            })
        } catch(error){
            console.log(error);
        }
    }
}
  export function removeDetail() {
    return {
      type: REMOVE_DETAILS,
    };
  }
  
  export function removeRecipe() {
    return {
      type: REMOVE_RECIPE
    }
  }
  

// export function filterCreated(payload) {
//   return {
//     type: FILTER_CREATED,
//     payload,
//   };
// }






