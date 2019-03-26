import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withAuthentication } from '../Session'

import EditRecipe from '../EditRecipe'
import RecipeNonAuth from '../RecipeNonAuth'

import './index.css'

class Recipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipe: null,
      loading: props.loading,
      authUser: props.authUser
    }
  }

  render () {
    const { recipe, loading, authUser } = this.state
    const rid = this.props.match.params.id

    return (
      <div>
        {recipe && authUser
          ? <EditRecipe
            recipe={recipe}
            uid={authUser.uid}
            rid={rid} />
          : <RecipeNonAuth recipe={recipe} />}
      </div>
    )
  }
}

Recipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  firebase: PropTypes.shape({
    singleUserRecipe: PropTypes.func,
    singleRecipe: PropTypes.func
  })
}

export default withAuthentication(Recipe)
