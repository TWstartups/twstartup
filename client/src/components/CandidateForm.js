import React from "react";
import { Field, reduxForm } from "redux-form";


class CandidateForm extends React.Component {
 

  renderError = ({error, touched, active}) =>{
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderServerErr = () => {
    if (this.props.errMsg) {
      return (
        <div className="ui error message">
          <div className="header">{this.props.errMsg}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, placeholder, meta, type }) => {
    let className = "required field";
    if (meta.error && meta.touched) {
      className = `required field error`
    }
    if (label === "Other support meterial") {
      className = "field"
    }
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          plazceholder={placeholder}
          autoComplete="off"
          type={type}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    
    this.props.onSubmit(formValues);
  }

  

  render() {
    return (
      <div className="candidate-form">
        <div className="ui grid container">
          <div className="five wide column"></div>
          <div className="six wide column">
            
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="ui huge header">About your company...</div>
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
              
              <button className="ui button" type="submit">Submit</button>
              {this.renderServerErr()}
            </form>
          </div>
          <div className="five wide column"></div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.company_name_en) {
    errors.company_name_en = "Please enter an English company name."
  }
  if (!formValues.company_name_chi ) {
    errors.company_name_chi = "Please enter a Chinese company name."
  }
  // if (formValues.company_name_chi && !formValues.company_name_chi.match(/[\u3400-\u9FBF]/)) {
  //   errors.company_name_chi = "Please enter a company name in Chinese."
  // }
  if(!formValues.website) {
    errors.website = "Please provide a website."
  }
  if(!formValues.news) {
    errors.news = "Please provide a news."
  }
  if(!formValues.company_email) {
    errors.company_email = "Please enter an email."
  }
  if (formValues.company_email && !formValues.company_email.match( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    errors.company_email = "Please enter a valid email."
  }

  
  return errors;
}




export default reduxForm({
  form: "candidateForm",
  validate
})(CandidateForm);
