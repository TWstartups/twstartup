import React from 'react'
import { month } from '../modals/data'
import { deleteEvent } from '../../../actions'
import { connect } from 'react-redux'

class EventCard extends React.Component {
  deleteEvent = () => {
    console.log(this.props.event.location)
    this.props.deleteEvent(this.props.compId, this.props.event._id)
  }

  render () {
    const { location, fromDay, fromMonth, toDay, toMonth, eventName, memo, link } = this.props.event
    return (
      <div className="event">
        <div className="event-card" onClick={() => window.open(link, '_blank')}>
          <div className="location">
            <img
              alt="marker"
              className="marker"
              src={require('../../../assets/images/marker.svg')}
            ></img>
            {location}
          </div>
          <div className="time">
            <div className="start-time">
              <div className="day">{fromDay}</div>
              <div className="month">{month[fromMonth]}</div>
            </div>
            <div className="dash">
              <p>-</p>
            </div>
            <div className="end-time">
              <div className="day">{toDay}</div>
              <div className="month">{month[toMonth]}</div>
            </div>
          </div>
          <div className="event-name">{eventName}</div>
          <div className="event-note">
            {memo}
          </div>
        </div>
        {this.props.checkOwnership && <div className="delete-btn"><img src={require('../../../assets/images/delete_btn.svg')} onClick={this.deleteEvent}></img></div>}
      </div>
    )
  }
}

export default connect(null, { deleteEvent })(EventCard)
