import React from 'react'
import { G, Line, Text } from 'react-native-svg'
import moment from 'moment'

const Axis = props => {
  const { x, y, width, height, scale, ticks, textColor } = props
  const endX = x + width
  const endY = y

  // Calculate tick points
  let tickPoints = []
  let TICK_SIZE = width / 35
  let TICKS_EVERY = Math.floor(width / (ticks - 1))

  let iterator = x
  while (iterator <= endX) {
    tickPoints.push(iterator)
    iterator += TICKS_EVERY
  }

  return (
    <G>
      <Line
        stroke={textColor}
        strokeWidth="3"
        x1={x}
        x2={endX}
        y1={y}
        y2={endY}
      />

      {tickPoints.map(pos => [
        <Line
          key={`h1-${pos}`}
          stroke={textColor}
          strokeWidth="3"
          x1={pos}
          y1={y}
          x2={pos}
          y2={y - TICK_SIZE}
        />,

        <Line
          key={`h2-${pos}`}
          stroke={textColor}
          strokeWidth="1"
          x1={pos}
          y1={y}
          x2={pos}
          y2={height}
        />
      ])}

      {tickPoints.map((pos, index) => {
        let textAnchor = 'middle'

        if (index == 0) textAnchor = 'start'
        if (index === tickPoints.length - 1) textAnchor = 'end'

        return (
          <Text
            key={`t-${pos}`}
            fill={textColor}
            stroke={textColor}
            fontSize={15}
            textAnchor={textAnchor}
            x={pos}
            y={y - 2 * TICK_SIZE}
          >
            {moment(scale.invert(pos)).format('D MMM')}
          </Text>
        )
      })}
    </G>
  )
}

export default Axis
