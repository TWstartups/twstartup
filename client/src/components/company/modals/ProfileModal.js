import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm';
import { formValues } from 'redux-form';


class ProfileModal extends React.Component {

  onSubmit = (formValues) => {
    console.log(formValues);
  }
  render(){
    console.log(this.props)
    return ReactDOM.createPortal(
      <div onClick={()=> this.props.hideModal()} className="ui dimmer modals visible active">
        <div onClick={(e)=> e.stopPropagation() } className="ui standard modal visible active">
          <div className="header">Edit Profile</div>
          <div className="content">
          <ProfileForm onSubmit={this.onSubmit} initialValues={this.props.company}/></div>
          <div className="actions">
          <div className="ui approve button">Approve</div>
      <div className="ui button">Neutral</div>
      <div className="ui cancel button">Cancel</div>
          </div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  }
}

const mapStateToProps = ({company})=> {
  return {company: company.currentCompany}
}

export default connect(mapStateToProps)(ProfileModal);