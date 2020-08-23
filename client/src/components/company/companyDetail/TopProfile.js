import React from 'react'
import { connect } from 'react-redux'
import ImageZone from '../imageZone'
import ProfileModal from '../modals/ProfileModal'
import { fetchComp } from '../../../actions'

// const socialLinkIcons = {
//   facebook: 'facebook',
//   instagram: 'instagram',
//   linkedIn: 'linkedin',
//   twitter: 'twitter',
//   angelList: 'angellist'
// }

class TopProfile extends React.Component {
  state = {
    showProfileModal: false
  }

  renderEditbtn = () => {
    if (this.props.checkOwnership) {
      return (
        <button
          onClick={() => this.setState({ showProfileModal: true })}
          className="circular ui icon button yellow"
        >
          <i className="edit outline icon"></i>
        </button>
      )
    }
  }

  hideModal = () => {
    this.setState({
      showProfileModal: false
    })
  }

  render () {
    const {
      companyNameEn,
      introduction,
      companyEmail,
      website,
      socialLinks,
      logo,
      _id
    } = this.props.company
    const socialLinksArr = Object.keys(socialLinks || {})
    console.log(socialLinksArr)
    return (
      <div className="top-profile-container">
        <div className="">
          <div className="session" style={{ textAlign: 'center' }}>
            <ImageZone className="company-img circle" src={logo} editable={this.props.checkOwnership} query={{ companyId: _id, type: 'logo' }} dimension={{ height: '100', width: '100' }} style={{ width: '250px' }}/>
          </div>
          <div className="session company-info">
            <div className="companyNameEn">{companyNameEn}{this.props.company && this.renderEditbtn()}</div>

            <div className="introduction">{introduction}</div>
            <div>
              <div className="info-link highlight" onClick={() => window.open(website)}>
                <i className="fa fa-globe" aria-hidden="true" />
                Website
              </div>
            </div>
            {companyEmail && <a className="info-link" href={`mailto:${companyEmail}`} rel="noopener noreferrer" target='_blank'>
              <i className="fa fa-envelope" aria-hidden="true"/>
            </a>}
            {socialLinksArr.map(s => (<span key={s}>
              {socialLinks[s] &&
                <a className="info-link" rel="noopener noreferrer" href={socialLinks[s]} target='_blank'>
                  <i className={`fa fa-${s.toLowerCase()}`} aria-hidden="true"/>
                </a>}
            </span>)
            )}
            <div></div>
          </div>
        </div>
        {this.state.showProfileModal && <ProfileModal hideModal={this.hideModal} />}
      </div>
    )
  }
}
const mapStateToProps = ({ user, company }) => {
  return { user, company: company.currentCompany }
}

export default connect(mapStateToProps, { fetchComp })(TopProfile)
