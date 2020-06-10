import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import DashBoard from "./DashBoard";
import CompanyList from "./CompanyList";
import ApplyConfirm from './ApplyConfirm';
import AdminDashBoard from './admin/AdminDashBoard';
import ShowApplication from './ShowApplication';
import Nav from './Nav';
import { fetchUser } from "../actions";
import { Switch, Route} from "react-router-dom";
import { connect } from "react-redux";
import CandidateCreate from "./CandidateCreate";
class App extends React.Component {
  //fetch current user from local storage jwt
  //if jwt -> fetch user
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.fetchUser(token);
    }
    
  }
  render() {
    
    return (
      <>
      <Nav/>
       
        <Switch>
          <Route exact path="/" component={CompanyList} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={DashBoard} />
          <Route exact path="/admin/dashboard" component={AdminDashBoard}/>      
          <Route path="/apply/success" component={ApplyConfirm} />
          <Route exact path="/apply/:id" component={CandidateCreate} />
          <Route path="/application/:id" component={ShowApplication}/>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({user}) => {

  
  return {email:user.email}
}

export default connect(mapStateToProps, { fetchUser })(App);
