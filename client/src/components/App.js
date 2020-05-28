import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import DashBoard from "./DashBoard";
import CompanyList from "./CompanyList";
import { logOut } from "../actions";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
class App extends React.Component {
  //fetch current user from local storage jwt
  //if jwt -> fetch user
  componentDidMount() {
    if (localStorage.getItem('token')) {
      
    }
  }

  handleLogOut = () => {
    this.props.logOut();
  };
  render() {
    console.log('props in app',this.props)
    return (
      <>
        <h2>Welcome {this.props.user.user}</h2>
        <Switch>
          <Route exact path="/" component={CompanyList} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={DashBoard} />
        </Switch>
        
        <Link className="ui button primary" to="/signup">
          Sign Up
        </Link>
        <Link className="ui button primary" to="/login">
          Log in
        </Link>
        <div className="ui button secondary" onClick={this.handleLogOut}>
          Log out
        </div>
        <Link to="/dashboard" className="ui button secondary">
          DashBoard
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {user: state.user}
}

export default connect(mapStateToProps, { logOut })(App);
