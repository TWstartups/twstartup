import React from 'react';
import { connect } from 'react-redux';
import { fetchCandis } from '../../actions';
import { Link } from 'react-router-dom';


class AdminDashBoard extends React.Component {

  componentDidMount(){
    this.props.fetchCandis();
  }

  renderCandiRow = () => {
    const Arr = this.props.candidates;
    return Arr.map(candidate => {
      return (
        <tr>
      <td>{candidate.company_name_en}</td>
      <td>{candidate.company_name_chi}</td>
      <td><a target="_blank" rel="noopener noreferrer" href={candidate.website} style={{cursor:'pointer'}}>{candidate.website}</a></td>
      <td><a target="_blank" rel="noopener noreferrer" href={candidate.news} style={{cursor:'pointer'}}>{candidate.news}</a></td>
      <td><a target="_blank" rel="noopener noreferrer" href={candidate.other} style={{cursor:'pointer'}}>{candidate.other}</a></td>
      <td>{candidate.applicant_email}</td>
      {candidate.approve_status ? <td><div class="ui small button">
      Approve
    </div></td>:<td>Approved</td>}
      
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
      <th>Company Name</th>
      <th>公司名稱</th>
      <th>Website</th>
      <th>News/Media</th>
      <th>Other Material</th>
      <th>Contact Email</th>
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
  render(){
    return (
      <div className="admin-dashboard">
      {this.props.errMsg ? this.renderReturnBtn():
     
      <div className="ui">
      {this.renderCandidates()}
      </div>
      }</div>
      
     
    )
  }
}

const mapStateToProps = ({ candidate }) => {
  
  return {candidates: candidate.candidates, errMsg: candidate.errMsg};
}


export default connect(mapStateToProps, {fetchCandis})(AdminDashBoard);