import React from 'react'
import { connect } from 'react-redux'
import { fetchCandis, approveCandi, fetchCandi } from '../../actions'
import { Link } from 'react-router-dom'
import moment from 'moment'

class AdminDashBoard extends React.Component {
  componentDidMount () {
    this.props.fetchCandis()
    // this.props.fetchCandi("5ee00f0d2899d90f1cdbb40a");
  }

  approve = (e) => {
    console.log(e.target.getAttribute('value'))
    const candiId = e.target.getAttribute('value')
    this.props.approveCandi(candiId, this.props.user._id)
  }

  renderCandiRow = () => {
    const Arr = this.props.candidates
    return Arr.map(candidate => {
      return (
        <tr key={candidate._id}>
          <td>{moment(candidate.createdAt).format('l')}</td>
          <td>{candidate.companyNameEn}</td>
          <td>{candidate.companyNameChi}</td>
          <td><a target="_blank" rel="noopener noreferrer" href={candidate.website} style={{ cursor: 'pointer' }}>{candidate.website}</a></td>
          <td><a target="_blank" rel="noopener noreferrer" href={candidate.news} style={{ cursor: 'pointer' }}>{candidate.news}</a></td>
          <td><a target="_blank" rel="noopener noreferrer" href={candidate.other} style={{ cursor: 'pointer' }}>{candidate.other}</a></td>
          <td>{candidate.applicant_email}</td>
          <td>{candidate.approver ? candidate.approver.name : ''}</td>
          {!candidate.approve_status ? <td><div value={`${candidate._id}`} className="ui small button" onClick={this.approve}>
      Approve
          </div></td> : <td><div className="ui small button disabled">
    Approved
          </div></td>}

        </tr>
      )
    })
  }

  renderCandidates = () => {
    console.log(this.props.candidates)
    return (
      <table className="ui collapsing unstackable table">
        <thead>
          <tr>
            <th>Apply At</th>
            <th>Company Name</th>
            <th>公司名稱</th>
            <th>Website</th>
            <th>News/Media</th>
            <th>Other Material</th>
            <th>Contact Email</th>
            <th>Approve by</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.candidates && this.renderCandiRow()}
        </tbody>
      </table>
    )
  }

  renderReturnBtn = () => {
    return (
      <React.Fragment>
        <div className="ui container">
          <div className="ui medium header">This page required admin access. Please log in as admin or go back to home page.
          </div>
          <Link to='/' className="ui button primary">Back to home</Link>
        </div>

      </React.Fragment>
    )
  }

  render () {
    return (
      <div className="admin-dashboard">
        {this.props.user.type !== 'super' ? this.renderReturnBtn()

          : <div className="ui">
            {this.renderCandidates()}
          </div>
        }</div>

    )
  }
}

const mapStateToProps = ({ candidate, user }) => {
  return { user, candidates: candidate.candidates, errMsg: candidate.errMsg }
}

export default connect(mapStateToProps, { fetchCandis, approveCandi, fetchCandi })(AdminDashBoard)
