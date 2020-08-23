import React from 'react'
import ImageZone from '../imageZone'
import { connect } from 'react-redux'
import { fetchComp } from '../../../actions'
import TeamModal from '../modals/TeamModal'

class Team extends React.Component {
  state = {
    showTeamModal: false
  }

  hideModal = () => {
    this.setState({
      showTeamModal: false
    })
  }

  renderEditbtn = () => {
    if (this.props.checkOwnership) {
      return (
        <button
          onClick={() => this.setState({ showTeamModal: true })}
          className="circular ui icon button"
        >
          <i className="edit outline icon"></i>
        </button>
      )
    }
  }

  renderExecutive = (exes, compnayId) => {
    if (exes && exes.length > 0) {
      return exes.map((exe, id) => {
        return (
          <div className="exe" key={exe._id}>
            <ImageZone
              className="executive"
              src={exe.image}
              type="executive"
              editable={this.props.checkOwnership}
              query={{ type: 'executive', companyId: compnayId, exeIndex: id }}
              dimension={{ width: '300px', height: '300px' }}
            />
            <div className="exe-title">{exe.title}</div>
            <div className="exe-name">
              {exe.firstName}{' '}
              {exe.lastName}
            </div>
            <a href={exe.link}>
              <img
                alt="executive"
                className="linkedin-logo"
                src={require('../../../assets/images/linedin.png')}
              ></img>
            </a>
            {this.state.showTeamModal && <TeamModal hideModal={this.hideModal}/>}
          </div>
        )
      })
    }
  }

  render () {
    const { _id, executives } = this.props.company
    return (
      <div className="team-container">
        <h2 className="team-title">Executive Team{this.renderEditbtn()}</h2>
        <div className="team-group">
          {this.renderExecutive(executives, _id)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps, { fetchComp })(Team)
