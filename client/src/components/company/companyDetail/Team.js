import React from 'react'
import ImageZone from '../imageZone'
import { connect } from 'react-redux'
import { fetchComp } from '../../../actions'

class Team extends React.Component {
  renderExecutive = (exes, compnayId) => {
    if (exes && exes.length > 0) {
      return exes.map((exe, id) => {
        return (
          <div className="exe col-sm-12 col-md-4" key={exe._id}>
            <ImageZone
              className="executive circle"
              src={exe.image}
              type="executive"
              editable={this.props.checkOwnership}
              query={{ type: 'executive', companyId: compnayId, exeIndex: id }}
              dimension={{ width: '70%' }}
            />
            <div className="exe-title">{exe.title}CEO</div>
            <div className="exe-name">
              {exe.firstName}
              {exe.lastName}
              Ceoooo Nameeee
            </div>
            <a className='info-link' href={exe.link}>
              <i className='fa fa-linkedin'/>
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
        <h2 className="session-header">Executive Team</h2>
        <div className="team-group row">
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
