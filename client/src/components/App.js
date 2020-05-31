import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import DashBoard from "./DashBoard";
import CompanyList from "./CompanyList";
import ApplyConfirm from './ApplyConfirm'
import Nav from './Nav';
import { fetchUser } from "../actions";
import { Switch, Route} from "react-router-dom";
import { connect } from "react-redux";
import CandidateForm from "./CandidateForm";
class App extends React.Component {
  //fetch current user from local storage jwt
  //if jwt -> fetch user
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.fetchUser(token);
    }
    console.log('api url',`${process.env.REACT_APP_API_URL}`)
  }
  render() {
    console.log('props in app',this.props.email)
    return (
      <>
      <Nav/>
       
        <Switch>
          <Route exact path="/" component={CompanyList} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={DashBoard} />
          <Route exact path="/apply" component={CandidateForm} />
          <Route path="/apply/success" component={ApplyConfirm} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({user}) => {

  
  return {email:user.email}
}

export default connect(mapStateToProps, { fetchUser })(App);
