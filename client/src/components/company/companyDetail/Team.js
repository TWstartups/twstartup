import React from 'react'
import ImageZone from '../imageZone'
import { connect } from 'react-redux'

class Team extends React.Component {
  render () {
    console.log('check editable', this.props.checkOwnership())
    const { _id, executives } = this.props.company
    return (
      <div className="team-container">
        <h2 className="team-title">Executive Team</h2>
        <div className="team-group">
          <div className="exe">
            <ImageZone className="executive"
              src={executives && executives[0].image} type="executive" editable={this.props.checkOwnership()} query={{ type: 'executive', companyId: _id, exeIndex: 1 }} />
            <div className="exe-title">CEO</div>
            <div className="exe-name">Ceooo Nameee</div>
            <a href="https://www.linkedin.com/in/amazingshellyyyy/"><img alt="executive" className="linkedin-logo" src={require('../../../assets/images/linedin.png')}></img></a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps)(Team)
