import React from "react";
import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";
import { signUp, errMsgReset } from "../actions";
import { Field, reduxForm } from "redux-form";

class Signup extends React.Component {
  componentWillUnmount() {

    this.props.errMsgReset();
  }
  onSubmit = (formValues) => {
 
    this.props.signUp(formValues);
  };

  renderError = ({error,touched,active}) => {
   if (touched && error) {
     if (!active && error.confirmPassword) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
     }
     return (
       <div className="ui error message">
         <div className="header">{error}</div>
       </div>
     )
   }
  };

  renderServerErr = () => {
    if (this.props.errMsg) {
      return (
        <div className="ui error message">
          <div className="header">{this.props.errMsg}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, placeholder, meta, type }) => {
    const className = `required field ${meta.error && meta.touched ? 'error': ''}`;
    
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} placeholder={placeholder} autoComplete='off' type={type} />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <div className="signup">
        <div className="ui grid container ">
          <div className="three column row">
            <div className="column"></div>
            <div className="column">
              <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <div className="ui header">Signup</div>

                <Field
                  name="email"
                  component={this.renderInput}
                  label="Email"
                  placeholder="Email"
                  type="email"
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  label="Password"
                  placeholder="Password"
                  type="password"
                />
                <Field
                  name="confirmPassword"
                  component={this.renderInput}
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                />

                <button className="ui button" type="submit">
                  Sign up
                </button>
                {this.renderServerErr()}
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

const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "You must enter an email.";
  }
  if (!formValues.password) {
    errors.password = "You must enter an password.";
  }
  if (!formValues.confirmPassword) {
    errors.confirmPassword = "Please confirm the password above.";
  }
  if (formValues.password && formValues.confirmPassword) {
   
     
      if (formValues.password !== formValues.confirmPassword) {
        errors.confirmPassword = "Please make sure your password match."
      }
    
  }
 
  return errors;
};

const mapStateToProps = ({ user }) => {
  return { user, errMsg: user.errMsg };
};



const formWrapped =  reduxForm({
  form: "signUp",
  validate,
})(Signup);

export default connect(mapStateToProps,{signUp, errMsgReset})(formWrapped);