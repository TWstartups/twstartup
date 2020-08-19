import React from 'react'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import DashBoard from './DashBoard'
import CompanyList from './company/CompanyList'
import ApplyConfirm from './ApplyConfirm'
import AdminDashBoard from './admin/AdminDashBoard'
import ShowApplication from './ShowApplication'
import Company from './company/companyDetail'
import Nav from './Nav'
import { fetchUser } from '../actions'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CandidateCreate from './CandidateCreate'
class App extends React.Component {
  // fetch current user from local storage jwt
  // if jwt -> fetch user
  componentDidMount () {
    const token = localStorage.getItem('tw_token')
    if (token) {
      this.props.fetchUser(token)
    }
  }

  render () {
    return (
      <>
        <Nav/>
        <Switch>
          <Route exact path="/" component={CompanyList} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard/:id" component={DashBoard} />
          <Route exact path="/admin/dashboard" component={AdminDashBoard}/>
          <Route path="/apply/success" component={ApplyConfirm} />
          <Route exact path="/apply/:id" component={CandidateCreate} />
          <Route path="/application/:id" component={ShowApplication}/>
          <Route path="/company/:id" render={(props) => (<Company key={props.match.params.id} {...props}/>)} />
        </Switch>
      </>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { email: user.email }
}

export default connect(mapStateToProps, { fetchUser })(App)
