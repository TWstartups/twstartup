import React from 'react'
import EventCard from './EventCard'
import { connect } from 'react-redux'
import EventModal from '../modals/EventModal'

class Events extends React.Component {
  state = {
    showEventModal: false
  }

  renderEventCard = () => {
    if (this.props.company.events && this.props.company.events.length > 0) {
      const events = this.props.company.events
      return events.map(event => {
        return <EventCard key={event._id} event={event}/>
      })
    }
  }

  hideModal = () => {
    this.setState({ showEventModal: false })
  }

  render () {
    return (
      <div className="event-container">
        <div className="event-title">Event</div>
        <div className="event-group">
          {this.renderEventCard()}
          <EventCard/>
          {this.props.checkOwnership &&
          <div className="event-add" onClick={() => this.setState({ showEventModal: true })}>
            Add New Event
          </div>}
        </div>
        {this.state.showEventModal && <EventModal hideModal={this.hideModal}/>}
      </div>
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}
export default connect(mapStateToProps)(Events)
