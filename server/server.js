const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5555

const server = express()
server.use(bodyParser.json())
server.use(cors())

const sendUserError = (msg, res) => {
  res.status(422)
  res.json({ Error: msg })
}

let recipes = [
  {
    id: 0,
    title: 'Healthy eggs',
    description:
      'Fried eggs with beans and spinach, topped with salsa and hot sauce',
    meal: 'breakfast',
    instructions:
      'Add oil and spinach to a frying pan. Once the spinach has started shrivelling up, break your desired number of eggs into the frying pan. Soon after, add beans. Once cooked, top with salsa and hot sauce.',
    ingredients: 'eggs, black beans, spinach, salsa, hot sauce',
    image:
      'https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2016/02/Southwest-InspiredBalckBeansAndEggs_JF16_EAT_FTR1_EGGS_800x800.jpg',
    preptime: '15 minutes'
  },
  {
    id: 1,
    title: 'Salmon spinach salad',
    description:
      'Fresh spinach leaves, salmon, chopped veggies and ranch dressing',
    meal: 'lunch',
    instructions:
      'Prepare salmon from a can (or cook it from fresh or frozen) and chop up your favourite vegetables. In a big bowl, combine the salmon and veggies with spinach. Add salad dressing, toss and serve.',
    ingredients:
      'spinach, salmon, carrots, broccoli, red peppers, ranch dressing',
    image:
      'https://www.bbcgoodfood.com/sites/default/files/styles/bbcgf_recipe/public/user-recipe/Warm%20Salmon%20Salad_10.jpg?itok=YK8kZ71p',
    preptime: '15 minutes'
  },
  {
    id: 2,
    title: 'Spaghetti squash and turkey balls',
    description:
      'Chunks of ground turkey and grilled veggies with marinara sauce',
    meal: 'dinner',
    instructions:
      'Halve your squash, season it, and toss it in the oven at 450 for ~45 minutes. Throw bits of turkey into a pan with oil then add chopped veggies. When done, add marinara sauce, combine with squash and serve.',
    ingredients:
      'ground turkey, spaghetti squash, marinara sauce, mushrooms, tomatoes, red onions, yellow and orange peppers',
    image:
      'https://images.meredith.com/content/dam/bhg/Images/recipecq/2013/05/RU203052.jpg.rendition.largest.jpg',
    preptime: '1 hour 10 minutes'
  },
  {
    id: 3,
    title: 'Fresh greens and roast veggies',
    description:
      'A bed of freshly picked kale, spinach, and lettuce. A roasted medley of beets, asparagus, sweet potatoes, carrots, and onions. Sprinkled with pieces of walnuts and dried cranberries and glazed with a maple balsamic dressing.',
    meal: 'lunch',
    instructions:
      'Chop up the veggies, spread them on a flat oven pan, and roast to your liking. In a big salad bowl, add the greens, the roasted veggies and the nuts and berries. In a bowl of your own, add dressing to your liking.',
    ingredients:
      'kale, spinach, lettuce, beets, asparagus, sweet potatoes, carrots, onions, walnuts, dried cranberries, maple balsamic dressing',
    image:
      'https://ibin.co/47YjPysi1UhG.jpg',
    preptime: '50 minutes'
  },
  {
    id: 4,
    title: 'Tofu tikka masala',
    description:
      'Spicy vegetarian tikka masala with assorted veggies',
    meal: 'dinner',
    instructions:
      'Chop sweet potatoes and toss them in the oven at 425. Add oil to a frying pan and add cauliflower, carrots, peppers, tomatoes in that order. Combine the sweet potatoes, tofu, baby corn and sauce then simmer until tender.',
    ingredients:
      'tofu, tikka masala sauce, tomatoes, cauliflower, yellow peppers, carrots, jalapeno peppers, baby corn, sweet potatoes',
    image:
      'https://ibin.co/49Bd2Tb4nCir.jpg',
    preptime: '1 hour'
  }
]

let recipeId = 5

server.get('/recipes', (req, res) => {
  res.json(recipes)
})

server.get('/recipes/:id', (req, res) => {
  let recipe = recipes.find(f => f.id === req.params.id)
  if (recipe) {
    res.status(200).json(recipe)
  } else {
    res.status(404).send({ msg: 'Recipe not found' })
  }
})

server.post('/recipes', (req, res) => {
  const recipe = { id: getRecipeId(), ...req.body }
  recipes = [...recipes, recipe]
  res.send(recipes)
})

server.put('/recipes/:id', (req, res) => {
  const { id } = req.params
  const {
    title,
    description,
    meal,
    instructions,
    ingredients,
    image,
    preptime
  } = req.body
  const findRecipeById = recipe => {
    return recipe.id === id
  }
  const foundRecipe = recipes.find(findRecipeById)
  if (!foundRecipe) {
    return sendUserError('No Recipe found by that ID', res)
  } else {
    if (title) foundRecipe.title = title
    if (description) foundRecipe.description = description
    if (meal) foundRecipe.meal = meal
    if (instructions) foundRecipe.instructions = instructions
    if (ingredients) foundRecipe.ingredients = ingredients
    if (image) foundRecipe.image = image
    if (preptime) foundRecipe.preptime = preptime
    res.json(recipes)
  }
})

server.delete('/recipes/:id', (req, res) => {
  const { id } = req.params

  recipes = recipes.filter(f => f.id !== Number(id))

  res.send(recipes)
})

function getRecipeId () {
  return recipeId++
}

server.listen(port, err => {
  if (err) console.log(err)
  console.log(`server is listening on port ${port}`)
})
