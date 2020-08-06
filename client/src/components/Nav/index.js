import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../actions'
import './index.scss'

class Index extends React.Component {
  handleLogOut = () => {
    this.props.logOut()
  };

  renderBtn = (firstTo, firstText) => {
    return (
      <React.Fragment>
        <div className="nav-item highlight">
          <Link className="" to={firstTo}>
            {firstText}
          </Link>
        </div>
        <div className="nav-item">
          <div className="" onClick={this.handleLogOut}>
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
          <Link className="login" to="/login">
            <div className="nav-item">Log In</div>
          </Link>
          <Link className="signup" to="/signup">
            <div className="nav-item highlight">Sign Up</div>
          </Link>
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
      <div className="ui menu global-navbar">
        <Link to='/'>
          <div className='logo'>TW<span>startups</span></div>
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

export default connect(mapStateToProp, { logOut })(Index)
