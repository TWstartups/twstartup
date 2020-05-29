import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class CompanyList extends React.Component {
  render(){
    return (
      <div>
        <h2>This is CompanyList</h2>
        <div>{this.props.email? this.props.email: 'no email'}</div>
      </div>
    );
  }
  
};

const mapStateToProps = ({user}) => {
  return {email: user.email}
}
export default connect(mapStateToProps)(CompanyList);
