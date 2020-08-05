import React from 'react'

const CompanyCard = (props) => {
  return (

    <div className="ui card" onClick={() => props.clickToCompany(props.compId)}>

      <div className="image">
        {props.image ? <img alt="company_logo" src={props.image} /> : <img alt="company_logo" src={process.env.PUBLIC_URL + '/logoDefault.png'} /> }

      </div>
      <div className="content">
        <div className="header">{props.title}</div>
        <div className="description">
          Kristy is an art director living in New York.
        </div>
      </div>
      <div className="extra content">
        <div className="ui blue labels">
          <div className="ui label">
        Happy
          </div>
          <div className="ui label">
        Smart
          </div>
          <div className="ui label">
        Insane
          </div>
          <div className="ui label">
        Exciting
          </div>
        </div>
      </div>

    </div>

  )
}

export default CompanyCard
