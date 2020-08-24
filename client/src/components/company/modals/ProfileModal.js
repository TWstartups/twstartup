import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import { editComp } from '../../../actions/index'
import _ from 'lodash'

class ProfileModal extends React.Component {
  onSubmit = (formValues) => {
    console.log('formValues', formValues)
    const socialLinks = _.pick(formValues, ['facebook', 'instagram', 'linkedIn', 'twitter', 'angelList', 'crunchbase'])
    const bodyToSend = _.pick(formValues, ['companyNameEn', 'companyEmail', 'website', 'introduction'])
    console.log('tosend', { ...bodyToSend, socialLinks })
    this.props.editComp(this.props.company._id, { ...bodyToSend, socialLinks })
    this.props.hideModal()
  }

  getInitialValue = () => {
    const inputs = _.pick(this.props.company, ['companyNameEn', 'introduction', 'companyEmail', 'website', 'socialLinks'])
    const initialValues = { ...inputs, facebook: inputs.socialLinks.facebook, instagram: inputs.socialLinks.instagram, linkedin: inputs.socialLinks.linkedIn, twitter: inputs.socialLinks.twitter, angelList: inputs.socialLinks.angelList, crunchbase: inputs.socialLinks.crunchbase }
    return initialValues
  }

  render () {
    return ReactDOM.createPortal(
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active">
          <div className="header">Edit Basic Profile</div>
          <div className="content">
            <ProfileForm onSubmit={this.onSubmit} initialValues={this.getInitialValue()} hideModal={this.props.hideModal}/></div>
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
