import React from 'react'
import { connect } from 'react-redux'
import { fetchComp } from '../../../actions'
import '../index.scss'
import TopProfile from './TopProfile'
import CompanyIntro from './CompanyIntro'
import ImageZone from '../imageZone'
import Team from './Team'

class Company extends React.Component {
  componentDidMount () {
    this.props.fetchComp(this.props.match.params.id)
  }

  renderProfileEditbtn = () => {
    if (this.checkProfileOwner()) {
      return (
        <button
          onClick={() => this.setState({ showProfileModal: true })}
          className="circular ui icon button"
        >
          <i className="edit outline icon"></i>
        </button>
      )
    }
  };

  renderUploadProfilebtn = () => {
    if (this.checkProfileOwner()) {
      return (
        <button
          onClick={() => this.setState({ showUploadProfileModal: true })}
          className="circular ui icon button"
        >
          <i className="edit outline icon"></i>
        </button>
      )
    }
  }

  checkOwnership = () => {
    const { user, company } = this.props
    return user.type === 'super' || (company.owners && (company.owners.indexOf(user._id) > -1))
  }

  render () {
    if (!this.props.company) {
      return <div>Loading</div>
    }
    // eslint-disable-next-line camelcase
    const { bannerImg, _id } = this.props.company
    return (
      <div className="company-container">
        <TopProfile checkOwnership={this.checkOwnership}/>
        <CompanyIntro/>
        <ImageZone className="banner-img" src={bannerImg} editable={this.checkOwnership()} query={{ companyId: _id, type: 'bannerImg' }}/>
        <Team checkOwnership={this.checkOwnership}/>
      </div>
    )
  }
}

const mapStateToProps = ({ user, company }) => {
  return { user, company: company.currentCompany }
}

export default connect(mapStateToProps, { fetchComp })(Company)
