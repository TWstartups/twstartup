import React from 'react'
// import { connect } from 'react-redux'

const KeyPoints = ({ keyPoints = [] }) => {
  if (keyPoints.length > 0) {
    return (<div className="key-points">
      <div className='session-header'>Key points</div>
      {keyPoints.map((k, i) => <div className='key-point-item' key={i}>{k}</div>)}
    </div>)
  } else {
    return <div></div>
  }
}

export default KeyPoints
