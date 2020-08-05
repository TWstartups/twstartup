import React from 'react'
import { connect } from 'react-redux'
import history from '../history'

class ApplyConfrim extends React.Component {
  render () {
    return (
      <div className="apply-confirm">
        <div className="ui grid container">

          <div className="five wide column"></div>
          <div className="six wide column">
            <div className="ui medium header">
              Your application is confirmed.
            </div>
            <div className="confirm-text">We will send email to:<br/>
              {this.props.candidate.email} <br/>after the application is approved.
            </div>
            <button className="ui button" onClick={() => history.push('/')}>Back to Home</button>

          </div>
          <div className="five wide column"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ candidate }) => {
  return { candidate }
}

export default connect(mapStateToProps)(ApplyConfrim)
