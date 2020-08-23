import React from 'react'
import { Field, reduxForm } from 'redux-form'

class TeamForm extends React.Component {
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
        <div className="ui header">1st person</div>
        <Field
          name="title0"
          component={this.renderInput}
          label="Title"
          placeholder=""
          type="text"
        />
        <div className="two fields">
          <Field
            name="firstName0"
            component={this.renderInput}
            label="First Name"
            placeholder=""
            type="text"
          />
          <Field
            name="lastName0"
            component={this.renderInput}
            label="Last name"
            placeholder=""
            type="text"
          />
        </div>
        <Field
          name="link0"
          component={this.renderInput}
          label="LinkedIn URL"
          placeholder=""
          type="text"
        />
        <div className="ui header">2nd person</div>
        <Field
          name="title1"
          component={this.renderInput}
          label="Title"
          placeholder=""
          type="text"
        />
        <div className="two fields">
          <Field
            name="firstName1"
            component={this.renderInput}
            label="First Name"
            placeholder=""
            type="text"
          />
          <Field
            name="lastName1"
            component={this.renderInput}
            label="Last name"
            placeholder=""
            type="text"
          />
        </div>
        <Field
          name="link1"
          component={this.renderInput}
          label="LinkedIn URL"
          placeholder=""
          type="text"
        />
        <div className="ui header">3rd person</div>
        <Field
          name="title2"
          component={this.renderInput}
          label="Title"
          placeholder=""
          type="text"
        />
        <div className="two fields">
          <Field
            name="firstName2"
            component={this.renderInput}
            label="First Name"
            placeholder=""
            type="text"
          />
          <Field
            name="lastName2"
            component={this.renderInput}
            label="Last name"
            placeholder=""
            type="text"
          />
        </div>
        <Field
          name="link2"
          component={this.renderInput}
          label="LinkedIn URL"
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
  form: 'TeamForm',
  validate
})(TeamForm)
