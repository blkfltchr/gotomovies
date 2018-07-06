const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4444;

const server = express();
server.use(bodyParser.json());
server.use(cors());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

let recipes = [
  {
    id: 0,
    title: "Healthy eggs",
    description:
      "Fried eggs with beans and spinach, topped with salsa and hot sauce",
    meal: "breakfast",
    instructions:
      "Add oil and spinach to a frying pan. Once the spinach has started shrivelling up, break your desired number of eggs into the frying pan. Soon after, add beans. Once cooked, top with salsa and hot sauce.",
    ingredients: "eggs, black beans, spinach, salsa, hot sauce",
    image:
      "https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2016/02/Southwest-InspiredBalckBeansAndEggs_JF16_EAT_FTR1_EGGS_800x800.jpg"
  },
  {
    id: 1,
    title: "Salmon spinach salad",
    description:
      "Fresh spinach leaves, salmon, chopped veggies and ranch dressing",
    meal: "lunch",
    instructions:
      "Prepare salmon from a can (or cook it from fresh or frozen) and chop up your favourite vegetables. In a big bowl, combine the salmon and veggies with spinach. Add salad dressing, toss and serve.",
    ingredients:
      "spinach, salmon, carrots, broccoli, red peppers, ranch dressing",
    image:
      "https://www.bbcgoodfood.com/sites/default/files/styles/bbcgf_recipe/public/user-recipe/Warm%20Salmon%20Salad_10.jpg?itok=YK8kZ71p"
  },
  {
    id: 2,
    title: "Spaghetti squash and turkey balls",
    description:
      "Chunks of ground turkey and grilled veggies with marinara sauce",
    meal: "dinner",
    instructions:
      "Halve your squash, season it, and toss it in the oven at 450 for ~45 minutes. Throw bits of turkey into a pan with oil then add chopped veggies. When done, add marinara sauce, combine with squash and serve",
    ingredients:
      "ground turkey, spaghetti squash, marinara sauce, mushrooms, tomatoes, red onions, yellow and orange peppers",
    image:
      "https://images.meredith.com/content/dam/bhg/Images/recipecq/2013/05/RU203052.jpg.rendition.largest.jpg"
  }
];

server.get("/recipes", (req, res) => {
  res.json(recipes);
});
let recipeId = 1;

server.post("/recipes", (req, res) => {
  const {
    title,
    description,
    meal,
    instructions,
    ingredients,
    image
  } = req.body;
  const newRecipe = {
    title,
    description,
    meal,
    instructions,
    ingredients,
    image,
    id: recipeId
  };
  if (!title || !description || !meal) {
    return sendUserError(
      "Ya gone did recipeed! title/description/meal are all required to create a recipe in the recipe DB.",
      res
    );
  }
  const findRecipeByTitle = recipe => {
    return recipe.title === title;
  };
  if (recipes.find(findRecipeByTitle)) {
    return sendUserError(`${title} already exists in the recipe DB.`, res);
  }

  recipes.push(newRecipe);
  recipeId++;
  res.json(recipes);
});

server.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    meal,
    instructions,
    ingredients,
    image
  } = req.body;
  const findRecipeById = recipe => {
    return recipe.id == id;
  };
  const foundRecipe = recipes.find(findRecipeById);
  if (!foundRecipe) {
    return sendUserError("No Recipe found by that ID", res);
  } else {
    if (title) foundRecipe.title = title;
    if (description) foundRecipe.description = description;
    if (meal) foundRecipe.meal = meal;
    if (instructions) foundeRecipe.instructions = instructions;
    if (ingredients) foundeRecipe.ingredients = ingredients;
    if (image) foundeRecipe.image = image;
    res.json(recipes);
  }
});

server.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const foundRecipe = recipes.find(recipe => recipe.id == id);

  if (foundRecipe) {
    const RecipeRemoved = { ...foundRecipe };
    recipes = recipes.filter(recipe => recipe.id != id);
    res.status(200).json(recipes);
  } else {
    sendUserError("No recipe by that ID exists in the recipe DB", res);
  }
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});
