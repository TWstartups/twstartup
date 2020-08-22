import React from 'react'
// import { connect } from 'react-redux'

class CompanyIntro extends React.Component {
  state = {
    showIntroModal: false
  }

  renderEditbtn = () => {
    if (this.checkOwnership) {
      return (
        <button
          onClick={() => this.setState({ showIntroModal: true })}
          className="circular ui icon button"
        >
          <i className="edit outline icon"></i>
        </button>
      )
    }
  }

  hideModal = () => {
    this.setState({
      showIntroModal: false
    })
  }

  render () {
    return (
      <div className="intro-container">
        <div>
          <div className="one-liner">One liner(up to 30 words)</div>
          {this.renderEditbtn()}
        </div>
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
