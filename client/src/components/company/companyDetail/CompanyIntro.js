import React from 'react'
import KeyPointModal from '../modals/KeyPointModal'
import { connect } from 'react-redux'

class CompanyIntro extends React.Component {
  state = {
    showIntroModal: false
  }

  renderEditbtn = () => {
    if (this.props.checkOwnership) {
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

  renderList = (keyPoints) => {
    return keyPoints.map(key => {
      return <ul key={key}>{key}</ul>
    })
  }

  render () {
    return (
      <div className="intro-container">
        <div>
          <div className="one-liner">{this.props.company.introduction}</div>
          {this.renderEditbtn()}
        </div>
        <ul className="bullet-list">
          {(this.props.company && this.props.company.keyPoints) && this.renderList(this.props.company.keyPoints)}
        </ul>
        {this.state.showIntroModal && <KeyPointModal hideModal={this.hideModal}/>}
      </div>
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps)(CompanyIntro)
