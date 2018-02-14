import React from 'react'
import { CircularProgress } from 'material-ui/Progress'

class Loading extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, .3)',
        }}
      >
        <CircularProgress
          style={{
            position: 'absolute',
            fontSize: 20,
            top: 'calc(45% - 10px)',
            left: 'calc(50% - 10px)',
          }}
        />
      </div>
    )
  }
}

export default Loading
