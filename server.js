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
      "https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2016/02/Southwest-InspiredBalckBeansAndEggs_JF16_EAT_FTR1_EGGS_800x800.jpg",
      preptime: "15 minutes"
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
      "https://www.bbcgoodfood.com/sites/default/files/styles/bbcgf_recipe/public/user-recipe/Warm%20Salmon%20Salad_10.jpg?itok=YK8kZ71p",
      preptime: "15 minutes"
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
      "https://images.meredith.com/content/dam/bhg/Images/recipecq/2013/05/RU203052.jpg.rendition.largest.jpg",
      preptime: "1 hour 10 minutes"
  }
];

let recipeId = 3;

server.get("/recipes", (req, res) => {
  res.json(recipes);
});

server.get('/recipes/:id', (req, res) => {

  if (recipe = recipes.find(f => f.id == req.params.id)) {
    res.status(200).json(recipe);
  } else {
    res.status(404).send({ msg: 'Recipe not found' });
  }
});

server.post('/recipes', (req, res) => {
  const note = { id: getRecipeId(), ...req.body };

  recipes = [...recipes, note];

  res.send(recipes);
});

server.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    meal,
    instructions,
    ingredients,
    image,
    preptime
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
    if (preptime) foundeRecipe.preptime = preptime;
    res.json(recipes);
  }
});

server.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;

  recipes = recipes.filter(f => f.id !== Number(id));

  res.send(recipes);
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});
