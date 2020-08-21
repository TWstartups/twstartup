import React from 'react'
// import { connect } from 'react-redux'

class CompanyIntro extends React.Component {
  render () {
    return (
      <div className="intro-container">
        <h6 className="one-liner">One liner(up to 30 words)</h6>
        <ul className="bullet-list">
          <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere leo eros, et sodales lorem placerat luctus. Duis cursus, libero.(up to 20 words)</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere leo eros, et sodales lorem placerat luctus. Duis cursus, libero.(up to 20 words)</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere leo eros, et sodales lorem placerat luctus. Duis cursus, libero.(up to 20 words)</li>
        </ul>
      </div>
    )
  }
}

export default CompanyIntro
