import React from 'react';
import { connect } from 'react-redux';
import { fetchCandis } from '../../actions';


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
      <td><a target="_blank" href={candidate.website} style={{cursor:'pointer'}}>{candidate.website}</a></td>
      <td><a target="_blank" href={candidate.news} style={{cursor:'pointer'}}>{candidate.news}</a></td>
      <td><a target="_blank" href={candidate.other} style={{cursor:'pointer'}}>{candidate.other}</a></td>
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
      <table class="ui collapsing unstackable table">
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
  render(){
    return (
      <div className="admin-dashboard">
      <div className="ui">
      {this.renderCandidates()}
      </div>
      </div>
     
    )
  }
}

const mapStateToProps = ({ candidate }) => {
  
  return {candidates: candidate.candidates};
}


export default connect(mapStateToProps, {fetchCandis})(AdminDashBoard);