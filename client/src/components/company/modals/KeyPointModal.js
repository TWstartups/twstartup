import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { editComp } from '../../../actions/index'
import KeyPointForm from './KeyPointForm'
import _ from 'lodash'

class KeyPointModal extends React.Component {
  onSubmit = (formValues) => {
    console.log('formValues', formValues)
    const bodyToSend = { keyPoints: [formValues.keyPoint_0, formValues.keyPoint_1, formValues.keyPoint_2] }
    this.props.editComp(this.props.company._id, bodyToSend)
      .then(() => {
        this.props.hideModal()
      })
  }

  getInitialValue = () => {
    const inputs = _.pick(this.props.company, ['keyPoints'])
    const initialvalue = { keyPoint_0: inputs.keyPoints[0], keyPoint_1: inputs.keyPoints[1], keyPoint_2: inputs.keyPoints[2] }
    return initialvalue
  }

  render () {
    return ReactDOM.createPortal(
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active keyPoint-modal">
          <div className="header">Key Points</div>
          <div className="content">
            <KeyPointForm onSubmit={this.onSubmit} initialValues={this.getInitialValue()} hideModal={this.props.hideModal}/></div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps, { editComp })(KeyPointModal)
