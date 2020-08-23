import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { editComp } from '../../../actions/index'
import EventForm from './EventForm'

class EventModal extends React.Component {
  onSubmit = (formValues) => {
    console.log('formValues', formValues)
  }

  render () {
    return ReactDOM.createPortal(
      <div onClick={() => this.props.hideModal()} className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active event-modal">
          <div className="header">Add New Event</div>
          <div className="content">
            <EventForm onSubmit={this.onSubmit} initialValues={{ fromMonth: 1, fromday: 1, toMonth: 1, toDay: 1 }} hideModal={this.props.hideModal}/></div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps, { editComp })(EventModal)
