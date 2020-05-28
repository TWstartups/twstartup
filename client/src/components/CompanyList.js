import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const CompanyList = () => {
  return (
    <div>
      <h2>This is CompanyList</h2>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('state in companylist',state)
}
export default connect(mapStateToProps)(CompanyList);
