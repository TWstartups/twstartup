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
          className="circular ui icon button yellow"
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

  renderList = (keyPoints = []) => {
    if (keyPoints.length > 0) {
      return (<div className="key-points">
        <div className='session-header'>Key points</div>
        {this.renderEditbtn()}
        {keyPoints.map((k, i) => <div className='key-point-item' key={i}>{k}</div>)}
      </div>)
    } else {
      return <div></div>
    }
  }

  render () {
    return (
      <div className="intro-container">
        <ul className="bullet-list">
          {this.props.company && this.renderList(this.props.company.keyPoints)}
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
