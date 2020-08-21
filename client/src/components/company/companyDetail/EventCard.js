import React from 'react'

const EventCard = ({ location, fromDay, fromMonth, toDay, toMonth, eventName, memo, link }) => {
  return (
    <div className="event-card" onClick={() => window.open('https://robinhood.com/', '_blank')}>
      <div className="location">
        <img
          className="marker"
          src={require('../../../assets/images/marker.svg')}
        ></img>
        San Francisco
      </div>
      <div className="time">
        <div className="start-time">
          <div className="day">05</div>
          <div className="month">May</div>
        </div>
        <div className="dash">
          <p>-</p>
        </div>
        <div className="end-time">
          <div className="day">12</div>
          <div className="month">May</div>
        </div>
      </div>
      <div className="event-name">ABC Demo Day</div>
      <div className="event-note">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        aliquet, lacus ac rhoncus eleifend, libero ligula tincidunt odio, nec
        pretium urna odio finibus ligula. Quisque ut sapien lectus. Nulla
        ornare.(up to 30 words)
      </div>
    </div>
  )
}

export default EventCard
