import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from '../actions';

class Nav extends React.Component {
  handleLogOut = () => {
    this.props.logOut();
  };
  renderNav = () => {
    if (this.props.email) {
      return(
        <React.Fragment>
        <div className="item">
        <Link className="ui button primary" to="/dashboard">
          Dashboard
        </Link>
      </div>
      <div className="item">
        <div className="ui button secondary" onClick={this.handleLogOut}>
          Log out
        </div>
      </div>
      </React.Fragment>
      )
      
    } else {
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
      
    }
  }
  render() {
    return (
      <div className="ui menu">
      <Link to='/'>
        <img src={require("../assets/images/logo.svg")} style={{}}></img>
        </Link>
        <div className="right menu">
          {this.renderNav()}
        </div>
      </div>
    );
  }
}

const mapStateToProp = ({user}) =>{
  
  return {email: user.email};
}

export default connect(mapStateToProp,{logOut})(Nav);
