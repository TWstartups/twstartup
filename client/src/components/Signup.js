import React from "react";
import { connect } from "react-redux";
import { signUp, errMsgReset } from "../actions";
import { Field, reduxForm } from "redux-form";

class Signup extends React.Component {
  componentWillUnmount() {
    this.props.errMsgReset();
  }
  onSubmit = (formValues) => {
    console.log(formValues);
    const toSend = { ...formValues, type: "normal" };
    console.log(toSend);
    this.props.signUp(toSend);
  };

  renderError = ({ error, touched, active }) => {
    if (touched && error) {
      if (!active && error.confirmPassword) {
        return (
          <div className="ui error message">
            <div className="header">{error}</div>
          </div>
        );
      }
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

  renderInput = ({tag, input, label, placeholder, meta, type }) => {
    let className = `required field`;
    if (meta.error && meta.touched) {
      className = `field error`
    }
    
    if (tag === "refer") {
      className = `field`;
    }
    console.log(className)
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
  renderOptions = () => {
    if (this.props.formValues && this.props.formValues.values) {
      const referType = this.props.formValues.values.referral;
      if (referType === "social_media") {
        return (
          <React.Fragment>
            <label>
              <Field
                name="referral_notes"
                component="input"
                type="radio"
                value="Facebook"
                tag="refer"
              />{" "}
              Facebook
            </label>
            <label>
              <Field
                name="referral_notes"
                component="input"
                type="radio"
                value="LinkedIn"
                tag="refer"
              />{" "}
              LinkedIn
            </label>
            <label>
              <Field
                name="referral_notes"
                component="input"
                type="radio"
                value="Other"
                tag="refer"
              />{" "}
              Other
            </label>
          </React.Fragment>
        );
      } else if (referType === "accelerator") {
        return (
          <React.Fragment>
            <Field
              name="referral_notes"
              component={this.renderInput}
              type="text"
              label="please put the name of the accelerator"
              tag="refer"
            />
          </React.Fragment>
        );
      } else if (referType === "VC") {
        return (
          <React.Fragment>
            <Field
              name="referral_notes"
              component={this.renderInput}
              type="text"
              tag="refer"
              label="please put the name of the VC"
            />
          </React.Fragment>
        );
      } else if (referType === "friend") {
        return (
          <React.Fragment>
            <Field
              name="referral_notes"
              component={this.renderInput}
              type="text"
              label="please put the name"
              tag="refer"
            />
          </React.Fragment>
        );
      } else if (referType === "other"){
        return (
          <React.Fragment>
            <Field name="referral_notes" component="textarea" tag="refer" label="Please specific the information."/>
            
          </React.Fragment>
        );
      }
    }
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
                <div className="ui huge header">Signup</div>

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
                <div className="ui small header">Referrals (optional)</div>
                <Field name="referral" component="select">
                  <option />
                  <option value="social_media">Social Media</option>
                  <option value="accelerator">Accelerator</option>
                  <option value="VC">VC</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </Field>
                {this.renderOptions()}
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
      errors.confirmPassword = "Please make sure your password match.";
    }
  }

  return errors;
};

const mapStateToProps = ({ user, form }) => {
  return { user, errMsg: user.errMsg, formValues: form.signUp };
};

const formWrapped = reduxForm({
  form: "signUp",
  validate,
})(Signup);

export default connect(mapStateToProps, { signUp, errMsgReset })(formWrapped);
