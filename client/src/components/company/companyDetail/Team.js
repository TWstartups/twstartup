import React from 'react'
import ImageZone from '../imageZone'
import { connect } from 'react-redux'
import { fetchComp } from '../../../actions'

class Team extends React.Component {
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
            <div className="exe-title">{exe.title}CEO</div>
            <div className="exe-name">
              {exe.firstName}
              {exe.lastName}
              Ceoooo Nameeee
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
