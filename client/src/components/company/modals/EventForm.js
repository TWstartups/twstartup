import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { month, days } from './data'
import { connect } from 'react-redux'

class EventForm extends React.Component {
  renderInput = ({ input, label, placeholder, meta, type }) => {
    if (label === 'Event Detail') {
      return (
        <div className="required field">
          <label>{label}</label>
          <textarea {...input} placeholder={placeholder} autoComplete="off"/>
        </div>
      )
    } else {
      return (
        <div className="required field">
          <label>{label}</label>
          <input {...input} placeholder={placeholder} autoComplete="off" type={type}/>
        </div>
      )
    }
  }

  renderMonth = () => {
    return Object.values(month).map((m, id) => {
      return (
        <option value={id + 1} key={m}>
          {m}
        </option>
      )
    })
  }

  renderDay = (key, values) => {
    const month = values[key]
    const year = new Date().getFullYear()
    const daysArr = []
    if (Number(month) === 2) {
      if (year % 4 === 0) {
        for (let i = 0; i < 29; i++) {
          daysArr.push(i + 1)
        }
        return daysArr.map((day) => {
          return (
            <option value={day} key={day}>
              {day}
            </option>
          )
        })
      } else {
        for (let i = 0; i < 30; i++) {
          daysArr.push(i + 1)
        }
        return daysArr.map((day) => {
          return (
            <option value={day} key={day}>
              {day}
            </option>
          )
        })
      }
    } else {
      for (let i = 0; i < days[Number(month)]; i++) {
        daysArr.push(i + 1)
      }
      return daysArr.map((day) => {
        return (
          <option value={day} key={day}>
            {day}
          </option>
        )
      })
    }
  }

  render () {
    console.log('in hereee', this.props.formValues)
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Field
          name="location"
          component={this.renderInput}
          label="Location (City)"
          placeholder=""
          type="text"
        />
        <div className="ui small header">From</div>
        <div className="two fields">
          <div className="required field">
            <label>Month</label>
            <Field name="fromMonth" component="select">
              {this.renderMonth()}
            </Field>
          </div>
          <div className="required field">
            <label>Day</label>
            <Field name="fromDay" component="select">
              {this.props.formValues && this.renderDay('fromMonth', this.props.formValues.values)}
            </Field>
          </div>
        </div>
        <div className="ui small header">To</div>
        <div className="two fields">
          <div className="required field">
            <label>Month</label>
            <Field name="toMonth" component="select">
              {this.renderMonth()}
            </Field>
          </div>
          <div className="required field">
            <label>Day</label>
            <Field name="toDay" component="select">
              {this.props.formValues && this.renderDay('toMonth', this.props.formValues.values)}
            </Field>
          </div>
        </div>
        <Field
          name="eventName"
          component={this.renderInput}
          label="Event Name"
          placeholder=""
          type="text"
        />
        <Field
          name="memo"
          component={this.renderInput}
          label="Event Detail"
          placeholder=""
          type="text"
        />
        <Field
          name="link"
          component={this.renderInput}
          label="Event Link"
          placeholder=""
          type="text"
        />
        <button className='ui button' type="submit">Submit</button>
        <div className="ui button" onClick={() => this.props.hideModal('showProfielModal')}>cancel</div>
      </form>
    )
  }
}

const validate = (formsValues) => {
  const errors = {}
  return errors
}

const mapStateToProps = ({ form }) => {
  return { formValues: form.EventForm }
}

const formWrapped = reduxForm({
  form: 'EventForm',
  validate
})(EventForm)

export default connect(mapStateToProps)(formWrapped)
