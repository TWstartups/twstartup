import React from 'react'
import { connect } from 'react-redux'
import {signUp, errMsgReset, logIn} from '../../actions'
import { Field, reduxForm } from 'redux-form'
import './index.scss'
class Login extends React.Component {
  componentWillUnmount () {
    this.props.errMsgReset()
  }

  onSubmit = (formValues) => {
    this.props.logIn(formValues)
  };

  renderError = ({ error, touched, active }) => {
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
  };

  renderInput = ({ tag, input, label, placeholder, meta, type }) => {
    let className = 'required field'
    if (meta.error && meta.touched) {
      className = 'field error'
    }

    if (tag === 'refer') {
      className = 'field'
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
    )
  };

  renderOptions = () => {
    if (this.props.formValues && this.props.formValues.values) {
      const referType = this.props.formValues.values.referral
      if (referType === 'social_media') {
        return (
          <React.Fragment>
            <label>
              <Field
                name="referral_notes"
                component="input"
                type="radio"
                value="Facebook"
                tag="refer"
              />{' '}
              Facebook
            </label>
            <label>
              <Field
                name="referral_notes"
                component="input"
                type="radio"
                value="LinkedIn"
                tag="refer"
              />{' '}
              LinkedIn
            </label>
            <label>
              <Field
                name="referral_notes"
                component="input"
                type="radio"
                value="Other"
                tag="refer"
              />{' '}
              Other
            </label>
          </React.Fragment>
        )
      } else if (referType === 'accelerator') {
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
        )
      } else if (referType === 'VC') {
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
        )
      } else if (referType === 'friend') {
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
        )
      } else if (referType === 'other') {
        return (
          <React.Fragment>
            <Field name="referral_notes" component="textarea" tag="refer" label="Please specific the information."/>
          </React.Fragment>
        )
      }
    }
  }

  render () {
    return (
      <div className="auth-container">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 image-col">
              <img src={require('../../assets/images/sign-up-image.svg')} alt='signup'/>
            </div>
            <div className="col-xs-12 col-sm-6 auth-col">
              <form
                className="error main-form"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <div className='marketing'>
                  <div className="title">Sign in</div>
                  <div className="sub-title">continue growing your <span className='primary-blue'>startup</span></div>
                </div>
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
                {this.renderOptions()}
                <button className="primary" type="submit">
                  Log In
                </button>
                {this.renderServerErr()}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const validate = (formValues) => {
  const errors = {}
  if (!formValues.email) {
    errors.email = 'You must enter an email.'
  }
  if (!formValues.password) {
    errors.password = 'You must enter an password.'
  }
  return errors
}

const mapStateToProps = ({ user }) => {
  return { user, errMsg: user.errMsg }
}

const formWrapped = reduxForm({
  form: 'logIn',
  validate
})(Login)

export default connect(mapStateToProps, { logIn, errMsgReset })(formWrapped)
