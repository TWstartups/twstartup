import React from "react";
import { connect } from "react-redux";
import { fetchComps } from '../../actions';
import CompanyCard from './CompanyCard';
import history from '../../history';

class CompanyList extends React.Component {
  componentDidMount() {
    this.props.fetchComps();
  }

  clickToCompany = (id) => {
    history.push(`/company/${id}`)
  }

  renderCompany = () => {
    console.log(this.props.companyList)
    return this.props.companyList.map(company => {
      return <CompanyCard title={company.company_name_en} clickToCompany={this.clickToCompany} compId={company._id}/>
    })
  }

  render(){
    
    return (
      <div className="ui container">
        <h2>This is CompanyList</h2>
        <div>{this.props.email? this.props.email: 'no email'}</div>
        <div className="ui link cards">{this.props.companyList && this.renderCompany()}</div>
      </div>
    );
  }
  
};

const mapStateToProps = ({user, company}) => {
  return {email: user.email, companyList: company.companylist}
}
export default connect(mapStateToProps, {fetchComps})(CompanyList);
