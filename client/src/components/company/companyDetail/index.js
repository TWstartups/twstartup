import React from 'react'
import { connect } from 'react-redux'
import { fetchComp } from '../../../actions'
import '../index.scss'
import TopProfile from './TopProfile'
import ImageZone from '../imageZone'
import CompanyIntro from './CompanyIntro'
import Team from './Team'
import Events from './Events'
import './style.scss'

class Company extends React.Component {
  componentDidMount () {
    console.log('going to fetch comp')
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
        <button onClick={() => this.setState({ showUploadProfileModal: true })} className='circular ui icon button'>
          <i className='edit outline icon'/>
        </button>
      )
    }
  }

  checkOwnership = () => {
    const { user, company } = this.props
    return user.type === 'super' || ((user._id && company.owners) && (company.owners.indexOf(user._id) > -1))
  }

  render () {
    console.log('this.props.company', this.props.company)
    if (!this.props.company) {
      return <div>Loading</div>
    }
    // eslint-disable-next-line camelcase
    const { bannerImg, _id } = this.props.company
    return (
      <div className="component-details-component container">
        <TopProfile checkOwnership={this.checkOwnership()}/>
        <CompanyIntro checkOwnership={this.checkOwnership()}/>
        {/* <KeyPoints keyPoints={this.props.company.keyPoints}/> */}
        <h2 className="session-header">Banner</h2>
        <ImageZone className="banner-img" src={bannerImg} editable={this.checkOwnership()} query={{ companyId: _id, type: 'bannerImg' }} dimension={{ width: 1000, height: 600 }} style={{ maxWidth: '1000px', width: '100%', height: '600px' }}/>
        <Team checkOwnership={this.checkOwnership()}/>
        <Events checkOwnership={this.checkOwnership()}/>
      </div>
    )
  }
}

const mapStateToProps = ({ user, company }) => {
  return { user, company: company.currentCompany }
}

export default connect(mapStateToProps, { fetchComp })(Company)
