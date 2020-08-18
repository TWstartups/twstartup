import React from 'react'
import { connect } from 'react-redux'
import { fetchComp } from '../../../actions'
import '../index.scss'
import TopProfile from './TopProfile'
import CompanyIntro from './CompanyIntro'

class Company extends React.Component {
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
    const { user, company } = this.props
    return user.type === 'super' || (user._id && (company.owners.indexOf(user._id) > -1))
  }

  render () {
    if (!this.props.company) {
      return <div>Loading</div>
    }
    // eslint-disable-next-line camelcase

    return (
      <div className="company-container">
        <TopProfile/>
        <CompanyIntro/>
      </div>
    )
  }
}

const mapStateToProps = ({ user, company }) => {
  return { user, company: company.currentCompany }
}

export default connect(mapStateToProps, { fetchComp })(Company)
