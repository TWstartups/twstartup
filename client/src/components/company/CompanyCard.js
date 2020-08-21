import React from 'react'

const CompanyCard = (props) => {
  const { company } = props
  console.log(company)
  return (
    <div className='col-sm-6 col-md-4 col-lg-3'>
      <div className="card" onClick={() => props.clickToCompany(props.compId)}>
        <div className="image">
          <img alt="company_logo" src={company.logo} />
        </div>
        <div className="body">
          <div className="companyNameEn">{company.companyNameEn}</div>
          {/* <div className="companyNameChi">{company.companyNameChi}</div> */}
          <div className="introduction">
            {company.introduction}
          </div>
        </div>
        {/* <div className="extra content"> */}
        {/*  <div className="ui blue labels"> */}
        {/*    <div className="ui label"> */}/Users/andychen/projects/twstartups/client/src/components/company/imageZone/index.js
        {/*  Happy */}
        {/*    </div> */}
        {/*    <div className="ui label"> */}
        {/*  Smart */}
        {/*    </div> */}
        {/*    <div className="ui label"> */}
        {/*  Insane */}
        {/*    </div> */}
        {/*    <div className="ui label"> */}
        {/*  Exciting */}
        {/*    </div> */}
        {/*  </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default CompanyCard
