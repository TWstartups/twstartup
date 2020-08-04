import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import { editComp } from '../../../actions/index'
import _ from 'lodash'

class ProfileModal extends React.Component {
  onSubmit = (formValues) => {
    console.log('formValues', formValues)

    const bodyToSend = _.pick(formValues, ['company_name_en', 'company_email', 'website'])
    console.log('tosend', bodyToSend)
    this.props.editComp(formValues._id, bodyToSend)
    this.props.hideModal()
  }

  render () {
    return ReactDOM.createPortal(
      <div onClick={() => this.props.hideModal()} className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active">
          <div className="header">Edit Profile</div>
          <div className="content">
            <ProfileForm onSubmit={this.onSubmit} initialValues={this.props.company} hideModal={this.props.hideModal}/></div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps, { editComp })(ProfileModal)
