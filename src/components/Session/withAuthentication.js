import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

/*
A higher-order component that extracts the session
handling for the authenticated user.
*/

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        authUser: null,
        loading: true
      }
    }

    componentDidMount () {
      this.listener = this.props.firebase.auth
        .onAuthStateChanged(
          authUser => {
            authUser
              ? this.setState({
                authUser,
                loading: false
              })
              : this.setState({
                authUser: null,
                loading: false
              })
          }
        )
    }

    componentWillUnmount () {
      this.listener()
    }

    render () {
      const {
        authUser,
        loading
      } = this.state
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component
            {...this.props}
            loading={loading}
            authUser={authUser}
          />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(withAuthentication)
}

export default withAuthentication
