import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const RecipeAuth = (props) => {
  const {
    title,
    image,
    description,
    ingredients,
    instructions,
    preptime,
    mealTypes
  } = props.addRecipe ? props.addRecipe : props.editRecipe

  const {
    handleOnChange,
    ingredientChange,
    addIngredient,
    removeIngredient,
    mealChange,
    add,
    update,
    remove
  } = props

  return (
    <div className='card-body'>
      <div className='form-group'>
        <input
          className='form-control'
          name='title'
          type='text'
          placeholder='Title'
          value={title}
          onChange={handleOnChange}
          required />
      </div>

      <div className='form-group'>
        <input
          className='form-control'
          name='image'
          type='text'
          value={image}
          placeholder='Image'
          onChange={handleOnChange}
          required />
      </div>

      <div className='form-group'>
        <input
          className='form-control'
          name='description'
          type='text'
          value={description}
          placeholder='Description'
          onChange={handleOnChange}
          required />
      </div>

      <div className='ingredients-list'>
        {ingredients.map((ingredient, index) => (
          <div className='form-group ingredient' key={index}>
            <input
              className='form-control ingredient-input'
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(event) =>
                ingredientChange(event, index)}
              required />
            <button
              className='btn btn-danger delete-ingredient'
              onClick={removeIngredient}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        className='btn btn-success add-ingredient'
        onClick={addIngredient}>
        Add Ingredient
      </button>

      <div className='form-group'>
        <textarea
          className='form-control instructions'
          name='instructions'
          type='text'
          value={instructions}
          placeholder='Insructions'
          rows='10'
          onChange={handleOnChange}
          required />
      </div>

      <div className='form-group'>
        <input
          name='preptime'
          className='form-control'
          type='number'
          value={preptime}
          placeholder='Prep Time'
          onChange={handleOnChange} />
      </div>

      <div className='form-group mealType'>
        <label>Breakfast</label>
        <input
          type='checkbox'
          value='breakfast'
          checked={mealTypes.indexOf('breakfast') > -1}
          onChange={mealChange} />
        <label>Lunch</label>
        <input
          type='checkbox'
          value='lunch'
          checked={mealTypes.indexOf('lunch') > -1}
          onChange={mealChange} />
        <label>Dinner</label>
        <input
          type='checkbox'
          value='dinner'
          checked={mealTypes.indexOf('dinner') > -1}
          onChange={mealChange} />
      </div>

      <input
        className='btn btn-primary btn-block'
        type='button'
        value={add ? 'Add Recipe' : 'Update Recipe'}
        onClick={add || update} />
      {remove
        ? <input
          className='btn btn-danger btn-block'
          type='button'
          value='Delete Recipe'
          onClick={remove} />
        : null}
    </div>
  )
}

RecipeAuth.propTypes = {
  addRecipe: PropTypes.object,
  editRecipe: PropTypes.object,
  handleOnChange: PropTypes.func,
  ingredientChange: PropTypes.func,
  addIngredient: PropTypes.func,
  removeIngredient: PropTypes.func,
  mealChange: PropTypes.func,
  add: PropTypes.func,
  update: PropTypes.func,
  remove: PropTypes.func
}

export default RecipeAuth
