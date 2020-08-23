import React from 'react'
import { Field, reduxForm } from 'redux-form'

class ProfileForm extends React.Component {
  renderInput = ({ input, label, placeholder, meta, type }) => {
    return (
      <div className="required field">
        <label>{label}</label>
        <input {...input} placeholder={placeholder} autoComplete="off" type={type}/>
      </div>
    )
  }

  render () {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Field
          name="companyNameEn"
          component={this.renderInput}
          label="Company Name in English"
          placeholder=""
          type="text"
        />
        <Field
          name="introduction"
          component={this.renderInput}
          label="One liner"
          placeholder=""
          type="text"
        />
        <Field
          name="companyEmail"
          component={this.renderInput}
          label="Contact Email"
          placeholder=""
          type="tel"
        />
        <Field
          name="website"
          component={this.renderInput}
          label="Company Website"
          placeholder=""
          type="text"
        />
        <button className='ui button' type="submit">Submit</button>
        <div className="ui button" onClick={() => this.props.hideModal('showProfielModal')}>cancel</div>
      </form>
    )
  }
}

const validate = (formsValues) => {
  const errors = {}
  return errors
}

export default reduxForm({
  form: 'profileForm',
  validate
})(ProfileForm)
