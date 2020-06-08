import React from "react";
import { connect } from "react-redux";
import { createCandi } from '../actions'
import CandidateForm from './CandidateForm';

class CandidateCreate extends React.Component {
 


  onSubmit = (formValues) => {
    console.log(formValues);
    const bodyToSend = {...formValues,applicant:this.props.match.params.id }
    this.props.createCandi(formValues);
  }

  

  render() {
    return (
      
        <div className="ui grid container">
          
            <CandidateForm onSubmit={this.onSubmit} header="About your company..."/>
        </div>
    
    );
  }
}


export default connect(null, {createCandi})(CandidateCreate);
