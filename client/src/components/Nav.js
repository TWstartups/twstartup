import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from '../actions';

class Nav extends React.Component {
  handleLogOut = () => {
    this.props.logOut();
  };
  renderNav = () => {
    if (this.props.user.company) {
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
    } else if (this.props.user.candidate || this.props.candidate.candidate) {
      const candiId = this.props.user.candidate? this.props.user.candidate : this.props.candidate.candidate._id;
      return(
        <React.Fragment>
        <div className="item">
        <Link className="ui button primary" to={`/application/${candiId}`}>
          See my application
        </Link>
      </div>
      <div className="item">
        <div className="ui button secondary" onClick={this.handleLogOut}>
          Log out
        </div>
      </div>
      </React.Fragment>
      )
      
    } else if (this.props.user._id && !this.props.user.candidate){
      return (
        <React.Fragment>
        <div className="item">
        <Link className="ui button primary" to={`/apply/${this.props.user._id}`}>
          Add a Company
        </Link>
      </div>
      <div className="item">
        <div className="ui button secondary" onClick={this.handleLogOut}>
          Log out
        </div>
      </div>
      </React.Fragment>
      )
    }else {
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
        <img alt="twstartups logo" src={require("../assets/images/logo.svg")} style={{}}></img>
        </Link>
        <div className="right menu">
          {this.renderNav()}
        </div>
      </div>
    );
  }
}

const mapStateToProp = ({user, candidate}) =>{
  
  return {user, candidate};
}

export default connect(mapStateToProp,{logOut})(Nav);
