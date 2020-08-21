import React from 'react'
import { connect } from 'react-redux'
import { fetchComp } from '../../../actions'
import '../index.scss'
import TopProfile from './TopProfile'
import CompanyIntro from './CompanyIntro'
import ImageZone from '../imageZone'
import Team from './Team'
import Events from './Events'

class Company extends React.Component {
  componentDidMount () {
    console.log(this.props)
    this.props.fetchComp(this.props.match.params.id)
  }

  renderProfileEditbtn = () => {
    if (this.checkOwnership()) {
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
    if (this.checkOwnership()) {
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
    console.log('check here', company.owners && (company.owners.indexOf(user._id) > -1))
    return user.type === 'super' || ((user._id && company.owners) && (company.owners.indexOf(user._id) > -1))
  }

  render () {
    if (!this.props.company) {
      return <div>Loading</div>
    }
    // eslint-disable-next-line camelcase
    const { bannerImg, _id } = this.props.company
    console.log('in company detail index')
    return (
      <div className="company-container">
        <TopProfile checkOwnership={this.checkOwnership()}/>
        <CompanyIntro/>
        <ImageZone className="banner-img" src={bannerImg} editable={this.checkOwnership()} query={{ companyId: _id, type: 'bannerImg' }} dimension={{ width: 400, height: 1000 }} style={{ maxWidth: '1000px', width: '100%' }}/>
        <Team checkOwnership={this.checkOwnership()}/>
        <Events/>
      </div>
    )
  }
}

const mapStateToProps = ({ user, company }) => {
  return { user, company: company.currentCompany }
}

export default connect(mapStateToProps, { fetchComp })(Company)
