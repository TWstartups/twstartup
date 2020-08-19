import React from 'react'
import { connect } from 'react-redux'
import { fetchComps } from '../../actions'
import CompanyCard from './CompanyCard'
import history from '../../history'

const Comapnies = ({ list }) => {
  return list.map(company => {
    return <CompanyCard
      key={company._id}
      title={company.companyNameEn}
      clickToCompany={() => history.push(`/company/${company._id}`)}
      compId={company._id}
    />
  })
}

class CompanyList extends React.Component {
  componentDidMount () {
    this.props.fetchComps()
  }

  clickToCompany = (id) => {
    history.push(`/company/${id}`)
  }

  renderCompany = () => {
    console.log(this.props.companyList)
    return this.props.companyList.map((company, id) => {
      return <CompanyCard title={company.companyNameEn} key={company._id + id} clickToCompany={this.clickToCompany} compId={company._id}/>
    })
  }

  render () {
    return (
      <div className="ui container">
        <h2>This is CompanyList</h2>
        <div className="ui link cards">{this.props.companyList && <>{this.renderCompany(this.props.companyList)}<Comapnies list={[...this.props.companyList, ...this.props.companyList, ...this.props.companyList, ...this.props.companyList, ...this.props.companyList, ...this.props.companyList]} /></>}</div>
      </div>
    )
  }
};

const mapStateToProps = ({ user, company }) => {
  console.log('companyList', company.companylist)
  return { email: user.email, companyList: company.companylist }
}
export default connect(mapStateToProps, { fetchComps })(CompanyList)
