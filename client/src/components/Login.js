import React from "react";
import { connect } from "react-redux";
import { logIn, errMsgReset } from "../actions";
import { Field, reduxForm } from "redux-form";

class Login extends React.Component {
  componentWillUnmount() {
    //reset props.errMsg with new Action
    this.props.errMsgReset();
  }

  onSubmit = (formValues) => {
    this.props.logIn(formValues);
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  renderServerErr = () => {
    if (this.props.errMsg) {
      return (
        <div className="ui error message">
          <div className="header">{this.props.errMsg}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, label, placeholder, meta, type }) => {
    const className = `required field ${
      meta.error && meta.touched ? "error" : ""
    }`;

    console.log('meta',meta)
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          placeholder={placeholder}
          autoComplete="off"
          type={type}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    console.log(this.props)
    return (
      <div className="login">
        <div className="ui grid container ">
          <div className="three column row">
            <div className="column"></div>
            <div className="column">
              <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <div className="ui huge header">Log in</div>
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

                <button className="ui button" type="submit">
                  Log in
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
  return errors;
};

const mapStateToProps = ({ user }) => {
  return { user,errMsg: user.errMsg };
};

const formWrapped = reduxForm({
  form: "logIn",
  validate,
})(Login);

export default connect(mapStateToProps, { logIn,errMsgReset })(formWrapped);
