import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

class CompanyForm extends React.Component {
  state={
    show:false
  }

  renderInput = ({ input, label, placeholder, meta, type }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input
          {...input}
          placeholder={placeholder}
          autoComplete="off"
          type={type}
        />
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
                name="referral_note"
                component="input"
                type="radio"
                value="Facebook"
              />{" "}
              Facebook
            </label>
            <label>
              <Field
                name="referral_note"
                component="input"
                type="radio"
                value="LinkedIn"
              />{" "}
              LinkedIn
            </label>
            <label>
              <Field
                name="referral_note"
                component="input"
                type="radio"
                value="Other"
              />{" "}
              Other
            </label>
          </React.Fragment>
        );
      } else if (referType === "accelerator") {
        return (
          <React.Fragment>
            <Field
              name="referral_note"
              component={this.renderInput}
              type="text"
              label="please put the name of the accelerator"
            />
          </React.Fragment>
        );
      } else if (referType === "VC") {
        return (
          <React.Fragment>
            <Field
              name="referral_note"
              component={this.renderInput}
              type="text"
              label="please put the name of the VC"
            />
          </React.Fragment>
        );
      } else if (referType === "friend") {
        return (
          <React.Fragment>
            <Field
              name="referral_note"
              component={this.renderInput}
              type="text"
              label="please put the name"
            />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Field name="referral_note" component="textarea" />
          </React.Fragment>
        );
      }
    }
  };

  render() {
    return (
      <div>
        <div className="ui grid container">
          <div className="five wide column"></div>
          <div className="six wide column">
            {!this.state.show && <div>
              <h2>What do you want to do next?</h2>
              <Link to="/" className="ui button">
                View some company
              </Link>
              <button to="/" className="ui button" onClick={()=>this.setState({show:true})}>
                Apply to be listed
              </button>
            </div>}
            {this.state.show &&
            <div className="ui form error">
              <div className="ui huge header">Sign up for your company</div>
              <div className="ui medium header">Basic Information</div>
              <Field
                name="company_name_en"
                component={this.renderInput}
                label="Company Name in English"
                placeholder=""
                type="text"
              />
              <Field
                name="company_name_chi"
                component={this.renderInput}
                label="Company Name in Chinese"
                placeholder=""
                type="text"
              />
              <Field
                name="company_email"
                component={this.renderInput}
                label="Contact Email"
                placeholder=""
                type="tel"
              />
              <div className="ui medium header">
                Supporting Resource for Review
              </div>
              <Field
                name="website"
                component={this.renderInput}
                label="Company Website"
                placeholder=""
                type="text"
              />
              <Field
                name="news"
                component={this.renderInput}
                label="News/Media link"
                placeholder=""
                type="text"
              />
              <Field
                name="other"
                component={this.renderInput}
                label="Other support meterial"
                placeholder=""
                type="text"
              />
              <div className="ui medium header">Referrals</div>
              <Field name="referral" component="select">
                <option />
                <option value="social_media">Social Media</option>
                <option value="accelerator">Accelerator</option>
                <option value="VC">VC</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </Field>
              {this.renderOptions()}
              <button className="ui button" type="submit">Submit</button>
            </div>}
          </div>
          <div className="five wide column"></div>
        </div>
      </div>
    );
  }
}

const formWrapped = reduxForm({
  form: "companyForm",
})(CompanyForm);

const mapStateToProps = ({ form }) => {
  return { formValues: form.companyForm };
};

export default connect(mapStateToProps)(formWrapped);
