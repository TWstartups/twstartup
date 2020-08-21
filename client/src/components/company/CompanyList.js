import React from 'react'
import { connect } from 'react-redux'
import { fetchComps } from '../../actions'
import CompanyCard from './CompanyCard'
import history from '../../history'

class CompanyList extends React.Component {
  componentDidMount () {
    this.props.fetchComps()
  }

  clickToCompany = (id) => {
    history.push(`/company/${id}`)
  }

  renderCompany = (list) => {
    return list.map((company, id) => {
      return <CompanyCard company={company} key={company._id + id} clickToCompany={this.clickToCompany} compId={company._id}/>
    })
  }

  render () {
    return (
      <div className="container company-list-component">
        <h2>This is CompanyList</h2>
        <div className="row">
          {this.renderCompany(this.props.companyList)}
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ user, company }) => {
  console.log('companyList', company.companylist)
  return { email: user.email, companyList: company.companylist }
}
export default connect(mapStateToProps, { fetchComps })(CompanyList)
