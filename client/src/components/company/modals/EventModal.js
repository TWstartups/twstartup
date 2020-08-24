import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { addEvent } from '../../../actions/index'
import EventForm from './EventForm'

class EventModal extends React.Component {
  onSubmit = (formValues) => {
    console.log('formValues', formValues)
    this.props.addEvent(formValues.compId, formValues)
      .then(() => {
        this.props.hideModal()
      })
  }

  render () {
    return ReactDOM.createPortal(
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active event-modal">
          <div className="header">Add New Event</div>
          <div className="content">
            <EventForm onSubmit={this.onSubmit} initialValues={{ fromMonth: 1, fromday: 1, toMonth: 1, toDay: 1, compId: this.props.company._id }} hideModal={this.props.hideModal}/></div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps, { addEvent })(EventModal)
