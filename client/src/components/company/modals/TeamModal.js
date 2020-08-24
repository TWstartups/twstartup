import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { editComp } from '../../../actions/index'
import TeamForm from './TeamForm'
import _ from 'lodash'

class TeamModal extends React.Component {
  onSubmit = (formValues) => {
    const { title0, title1, title2, firstName0, firstName1, firstName2, lastName0, lastName1, lastName2, link0, link1, link2 } = formValues
    const bodyToSend = { executives: [{ title: title0, firstName: firstName0, lastName: lastName0, link: link0 }, { title: title1, firstName: firstName1, lastName: lastName1, link: link1 }, { title: title2, firstName: firstName2, lastName: lastName2, link: link2 }] }
    console.log(bodyToSend)
    this.props.editComp(formValues._id, bodyToSend)
      .then(() => {
        this.props.hideModal()
      })
  }

  getInitialValue = () => {
    const inputs = _.pick(this.props.company, ['executives', '_id'])
    const exeArr = [...inputs.executives]
    const initialValues = { ...inputs, title0: exeArr[0].title, firstName0: exeArr[0].firstName, lastName0: exeArr[0].lastName, link0: exeArr[0].link, title1: exeArr[1].title, firstName1: exeArr[1].firstName, lastName1: exeArr[1].lastName, link1: exeArr[1].link, title2: exeArr[2].title, firstName2: exeArr[2].firstName, lastName2: exeArr[2].lastName, link2: exeArr[2].link }
    return initialValues
  }

  render () {
    return ReactDOM.createPortal(
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active team-modal">
          <div className="header">Key Points</div>
          <div className="content">
            <TeamForm onSubmit={this.onSubmit} initialValues={this.getInitialValue()} hideModal={this.props.hideModal}/></div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  }
}

const mapStateToProps = ({ company }) => {
  return { company: company.currentCompany }
}

export default connect(mapStateToProps, { editComp })(TeamModal)
