import React from 'react'
import { Field, reduxForm } from 'redux-form'

class KeyPointForm extends React.Component {
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
          name="introduction"
          component={this.renderInput}
          label="Company One liner"
          placeholder=""
          type="text"
        />
        <Field
          name="keyPoint_0"
          component={this.renderInput}
          label="Key Point"
          placeholder=""
          type="text"
        />
        <Field
          name="keyPoint_1"
          component={this.renderInput}
          label="Key Point"
          placeholder=""
          type="text"
        />
        <Field
          name="keyPoint_2"
          component={this.renderInput}
          label="Key Point"
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
  form: 'KeyPointForm',
  validate
})(KeyPointForm)
