import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { editComp } from '../../../actions/index'
import _ from 'lodash'
import Dropzone from 'react-dropzone'

class ProfileImgModal extends React.Component {
  onSubmit = (formValues) => {
    console.log('formValues', formValues)

    const bodyToSend = _.pick(formValues, ['companyNameEn', 'companyEmail', 'website'])
    console.log('tosend', bodyToSend)

    // this.props.hideModal();
  }

  onDrop = accetpedFiles => {

  }

  render () {
    return ReactDOM.createPortal(
      <div onClick={() => this.props.hideModal()} className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active">
          <div className="header">Edit Profile</div>
          <div className="content">
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="drop-zone"></div>
                  </div>
                </section>
              )}
            </Dropzone>
            <button className='ui button' type="submit">Submit</button>
            <div className="ui button" onClick={() => this.props.hideModal()}>cancel</div>
          </div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps, { editComp })(ProfileImgModal)
