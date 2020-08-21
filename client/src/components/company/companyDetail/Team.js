import React from 'react'
import ImageZone from '../imageZone'
import { connect } from 'react-redux'
import { fetchComp } from '../../../actions'

class Team extends React.Component {
  renderExecutive = (exes, id) => {
    console.log('in render exe', exes, id)
    console.log('check exe', this.props.checkOwnership)
    if (exes && exes.length > 0) {
      return exes.map((exe) => {
        return (
          <div className="exe" key={exe._id}>
            <ImageZone
              className="executive"
              src={exe.image}
              type="executive"
              editable={this.props.checkOwnership}
              query={{ type: 'executive', companyId: id, exeIndex: 1 }}
            />
            <div className="exe-title">{exe.title}</div>
            <div className="exe-name">
              {exe.firstName}
              {exe.lastName}
            </div>
            <a href={exe.link}>
              <img
                alt="executive"
                className="linkedin-logo"
                src={require('../../../assets/images/linedin.png')}
              ></img>
            </a>
          </div>
        )
      })
    }
  }

  render () {
    const { _id, executives } = this.props.company
    console.log('in Team', _id, executives)
    return (
      <div className="team-container">
        <h2 className="team-title">Executive Team</h2>
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
