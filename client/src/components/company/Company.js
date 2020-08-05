import React from 'react'
import { connect } from 'react-redux'
import { fetchComp } from '../../actions'
import ProfileModal from './modals/ProfileModal'
import ProfileImgModal from './imageZone/modal'
import ImageZone from './imageZone'
import './index.scss'

class Company extends React.Component {
  state = {
    showProfileModal: false,
    showUploadProfileModal: false
  };

  hideModal = () => {
    this.setState({
      showProfileModal: false,
      showUploadProfileModal: false
    })
  };

  componentDidMount () {
    this.props.fetchComp(this.props.match.params.id)
  }

  checkProfileOwner = () => {
    const userId = this.props.user._id
    const ownerArr = this.props.company.owners
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
    const { user, company } = this.props;
    return user.type === 'super' || (user._id && (company.owners.indexOf(user._id) > -1));
  }

  render () {
    if (!this.props.company) {
      return <div>Loading</div>
    }
    // eslint-disable-next-line camelcase
    const { company_email, company_name_en, website, logo } = this.props.company
    return (
      <div className="company-container">
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
                  <h1 className="company-name">{company_name_en}</h1>
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
                    href={`mailto:${company_email}`}
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
        </div>

        {this.state.showProfileModal && <ProfileModal hideModal={this.hideModal} />}
        {this.state.showUploadProfileModal && <ProfileImgModal hideModal={this.hideModal} />}
      </div>
    )
  }
}

const mapStateToProps = ({ user, company }) => {
  return { user, company: company.currentCompany }
}

export default connect(mapStateToProps, { fetchComp })(Company)
