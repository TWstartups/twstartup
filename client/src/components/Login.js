import React from "react";
import GoogleAuth from './GoogleAuth';
import { connect } from 'react-redux';
import { logIn } from '../actions';


class Login extends React.Component {

  state = {
    email:null,
    password:null,
  }

 

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    
    this.props.logIn(this.state)
    
  }


  render() {
    
    return (
      <div className="login">
        <div className="ui grid container ">
          <div className="three column row">
            <div className="column"></div>
            <div className="column">
              <form className="ui form" onSubmit={this.onSubmit}>
                <div className="ui header">Log in</div>
                <div className="field">
                  <label>Email</label>
                  <input type="text" name="email" placeholder="Email" onChange={this.onInputChange} />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onInputChange} 
                  />
                </div>
                
                <div className="field">
                  <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" className="hidden" />
                    <label>I agree to the Terms and Conditions</label>
                  </div>
                </div>
                <button className="ui button" type="submit">
                  Sign up
                </button>
              </form>
            </div>
            <div className="column"></div>
          </div>

          <div className="three column row">
            <div className="column"></div>
            <div className="column">
              <div className="ui divider"></div>
              {/* <GoogleAuth/> */}
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  
  return { user: state.user}
}

export default connect(mapStateToProps,{logIn})(Login);
