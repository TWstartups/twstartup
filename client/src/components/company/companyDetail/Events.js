import React from 'react'
import EventCard from './EventCard'
import { connect } from 'react-redux'

class Events extends React.Component {
  renderEventCard = () => {
    if (this.props.company.events && this.props.company.events.length > 0) {
      const events = this.props.company.events
      return events.map(event => {
        return <EventCard key={event._id} event={event}/>
      })
    }
  }

  render () {
    return (
      <div className="event-container">
        <div className="event-title">Event</div>
        <div className="event-group">
          {this.renderEventCard()}
          <EventCard/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}
export default connect(mapStateToProps)(Events)
