import React from 'react'
import { connect } from 'react-redux'
import { fetchComps } from '../../actions'
import CompanyCard from './CompanyCard'

class CompanyList extends React.Component {
  componentDidMount () {
    this.props.fetchComps()
  }

  renderCompany = (list) => {
    return list.map((company, id) => {
      return <CompanyCard company={company} key={company._id + id} compId={company._id}/>
    })
  }

  render () {
    return (
      <div className="company-list-component">
        <div className={`hero-layer option-${Math.floor(Math.random() * 3)}`}>
          <div className='header-title'>Explore<span>startups</span></div>
        </div>
        <div className="container">
          <div className="row">
            {this.renderCompany(this.props.companyList)}
          </div>
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
