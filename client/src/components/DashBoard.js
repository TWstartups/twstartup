import React from 'react'
import { connect } from 'react-redux'

class DashBoard extends React.Component {
  render () {
    return (
      <div>
        <h2>This is Dashboard
        </h2>

      </div>
    )
  }
}

export default connect(null)(DashBoard)
