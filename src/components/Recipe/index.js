import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withAuthentication } from '../Session'

import RecipeAuth from '../RecipeAuth'
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

  static getDerivedStateFromProps (props, state) {
    if (props.loading !== state.loading) {
      return {
        loading: props.loading,
        authUser: props.authUser
      }
    }

    return null
  }

  componentDidUpdate (prevProps) {
    if (this.props.loading !== prevProps.loading) {
      this.getRecipe()
    }
  }

  getRecipe = () => {
    const { authUser, loading } = this.state

    if (!loading) {
      const USER_ID = authUser ? authUser.uid : null
      const RECIPE_ID = this.props.match.params.id

      if (USER_ID || RECIPE_ID) {
        this.props.firebase
          .singleUserRecipe(USER_ID, RECIPE_ID)
          .once('value', snapshot => {
            if (snapshot.val()) {
              this.setState({
                recipe: snapshot.val()
              })
            } else {
              this.props.firebase
                .singleRecipe(RECIPE_ID)
                .once('value', snapshot => {
                  if (snapshot.val()) {
                    this.setState({
                      recipe: snapshot.val()
                    })
                  }
                })
            }
          })
      }
    }
  }

  render () {
    const { recipe, loading, authUser } = this.state

    if (loading || !recipe) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        {recipe && authUser
          ? <RecipeAuth recipe={recipe} />
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
