import React from "react";


const CompanyCard = (props) => {
  return (
    
    <div className="ui card" onClick={()=>props.clickToCompany(props.compId)}>
   
      <div className="image">
      {props.image?<img src={props.image} />:<img src={process.env.PUBLIC_URL + '/logoDefault.png'} /> }
        
      </div>
      <div className="content">
        <a className="header">{props.title}</a>
        <div className="description">
          Kristy is an art director living in New York.
        </div>
      </div>
      <div className="extra content">
      <div className="ui blue labels">
      <a className="ui label">
        Happy
      </a>
      <a className="ui label">
        Smart
      </a>
      <a className="ui label">
        Insane
      </a>
      <a className="ui label">
        Exciting
      </a>
    </div>
      </div>
      
    </div>
   
  );
};

export default CompanyCard;
