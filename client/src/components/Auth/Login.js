import React from 'react'
import { connect } from 'react-redux'
import { errMsgReset, logIn } from '../../actions'
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

  render () {
    return (
      <div className="auth-container">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 image-col">
              <img src={require('../../assets/images/sign-in-image.svg')} alt='signup'/>
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
