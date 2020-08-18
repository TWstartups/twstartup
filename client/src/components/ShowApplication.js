import React from 'react'
import { connect } from 'react-redux'
import { fetchCandi } from '../actions'

class ShowApplication extends React.Component {
  componentDidMount () {
    this.props.fetchCandi(this.props.match.params.id)
  }

  onSubmit = (formValues) => {
    console.log(formValues)
  };

  renderStatus = () => {
    const status = this.props.candidate.approve_status
    if (status === true) {
      return (
        <div className="ui green label">Approved</div>
      )
    } else {
      return <div className="ui yellow label">Pending</div>
    }
  }

  render () {
    if (!this.props.candidate) {
      return <div>Loading</div>
    }

    return (
      <div className="show-application">
        <div className="ui grid container">
          <div className="ui vertical segment" style={{ width: '100%' }}>
            <h2 className="uileft floated header">Your Application</h2>
            <div>
              {this.props.candidate && this.renderStatus()}
            </div>
            <div className="ui clearing divider"></div>
            <div className="ui grid">
              <div className="one wide column"></div>
              <div className="five wide column">
                <div className="ui small header">Company Name in English</div>
                <div>{this.props.candidate.companyNameEn}</div>
              </div>
              <div className="five wide column">
                <div className="ui small header">Company Name in Chinese</div>
                <div>{this.props.candidate.companyNameChi}</div>
              </div>
              <div className="five wide column">
                <div className="ui small header">Company Contact Email</div>
                <div>{this.props.candidate.companyEmail}</div></div>
              <div className="one wide column"></div>
              <div className="five wide column">
                <div className="ui small header">Company Website</div>
                <div>{this.props.candidate.website}</div></div>
              <div className="five wide column">
                <div className="ui small header">News/Media</div>
                <div>{this.props.candidate.news}</div></div>
              <div className="five wide column">
                <div className="ui small header">Other support resource</div>
                <div>{this.props.candidate.other}</div></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, candidate, form }) => {
  return { candidateId: user.candidate, candidate: candidate.candidate }
}

export default connect(mapStateToProps, { fetchCandi })(
  ShowApplication
)
