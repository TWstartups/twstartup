import React from 'react'
import { connect } from 'react-redux'
import ImageZone from '../imageZone'
import ProfileModal from '../modals/ProfileModal'

class TopProfile extends React.Component {
  state = {
    showProfileModal: false
  };

  hideModal = () => {
    this.setState({
      showProfileModal: false
    })
  };

  checkOwnership = () => {
    const { user, company } = this.props
    return user.type === 'super' || (user._id && (company.owners.indexOf(user._id) > -1))
  }

  checkProfileOwner = () => {
    const userId = this.props.user._id
    const ownerArr = this.props.company.owners
    console.log('this.props', this.props)
    for (let i = 0; i < ownerArr.length; i++) {
      if (ownerArr[i] === userId) {
        return true
      }
    }
    return false
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

  render () {
    const { companyEmail, companyNameEn, website, logo } = this.props.company
    console.log('logo in company detail', logo)
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="two wide column"></div>
          <div className="four wide column" style={{ textAlign: 'center' }}>
            <ImageZone className="company-img" src={logo} type='logo' editable={this.checkOwnership()} companyId={this.props.company._id} />
          </div>
          <div className="six wide column">
            <div className="company-info">
              <div>
                {/* eslint-disable-next-line camelcase */}
                <h1 className="company-name">{companyNameEn}</h1>
                <div className="ui blue labels">
                  <div className="ui label">Happy</div>
                  <div className="ui label">Smart</div>
                  <div className="ui label">Insane</div>
                  <div className="ui label">Exciting</div>
                </div>
              </div>

              <div className="btn-group">
                <div
                  className="ui teal button"
                  onClick={() => window.open(`${website}`)}
                >
                    Website
                </div>
                <a
                  className="ui yellow button"
                  // eslint-disable-next-line camelcase
                  href={`mailto:${companyEmail}`}
                >
                    Contact
                </a>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div>{this.props.company && this.renderProfileEditbtn()}</div>
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

export default connect(mapStateToProps)(TopProfile)
