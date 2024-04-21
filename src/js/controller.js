import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable"; // polyfilling almost everyting
import "regenerator-runtime/runtime"; // polyfilling async-awaits

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id); // loadRecipe returns promise

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

["hashchange", "load"].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
