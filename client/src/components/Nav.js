import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../actions'

class Nav extends React.Component {
  handleLogOut = () => {
    this.props.logOut()
  };

  renderBtn = (firstTo, firstText) => {
    return (
      <React.Fragment>
        <div className="item">
          <Link className="ui button primary" to={firstTo}>
            {firstText}
          </Link>
        </div>
        <div className="item">
          <div className="ui button secondary" onClick={this.handleLogOut}>
          Log out
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderNav = () => {
    if (!this.props.user.isLogIn) {
      return (
        <React.Fragment>
          <div className="item">
            <Link className="ui button primary" to="/signup">
          Sign Up
            </Link>
          </div>
          <div className="item">
            <Link className="ui button primary" to="/login">
          Log In
            </Link>
          </div>
        </React.Fragment>
      )
    } else if (this.props.user.type === 'normal' && !this.props.user.candidate && !this.props.candidate.candidate) {
      return this.renderBtn(`/apply/${this.props.user._id}`, 'Add a company')
    } else if (this.props.user.type === 'normal' && !this.props.user.company) {
      const candiId = this.props.user.candidate ? this.props.user.candidate : this.props.candidate.candidate._id
      return this.renderBtn(`/application/${candiId}`, 'See your application')
    } else if (this.props.user.type === 'normal') {
      return this.renderBtn(`/company/${this.props.user.company}`, 'My Company')
    } else {
      return this.renderBtn('/admin/dashboard', 'Admin Dashboard')
    }
  }

  render () {
    return (
      <div className="ui menu">
        <Link to='/'>
          <img alt="twstartups logo" src={require('../assets/images/logo.svg')} style={{}}></img>
        </Link>
        <div className="right menu">
          {this.renderNav()}
        </div>
      </div>
    )
  }
}

const mapStateToProp = ({ user, candidate }) => {
  return { user, candidate }
}

export default connect(mapStateToProp, { logOut })(Nav)
