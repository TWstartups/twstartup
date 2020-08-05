import React from 'react'
import { connect } from 'react-redux'
// import { signIn } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount () {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '708463758106-0mgvmavhvulqpci65mglhkq8h30c25up.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }

  // onAuthChange = (isSignedIn) => {
  //   if (isSignedIn) {
  //     this.props.signIn(this.auth.currentUser.get().getId());
  //   }
  // }

  // onSignInClick=()=>{
  //   this.auth.signIn();
  // }

  renderAuthButton () {
    return (
      <button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon" />
          Sign in with GoogleAuth
      </button>
    )
  }

  render () {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStatesToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStatesToProps)(GoogleAuth)
