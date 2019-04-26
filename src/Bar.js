import React from 'react'
import { Rect, Text, G } from 'react-native-svg'

const Bar = props => {
  const {
    index,
    startVal,
    endVal,
    scale,
    barHeight,
    task,
    onPress,
    primaryColor,
    secondaryColor,
    textColor
  } = props

  const padding = 4

  const x = scale(startVal)
  const y = barHeight * index + padding * (index + 1)
  const taskDuration = scale(endVal) - scale(startVal)

  return (
    <G onPressIn={() => onPress(task)}>
      <Rect
        x={x}
        y={y}
        height={barHeight}
        width={taskDuration * task.progress}
        strokeWidth={2}
        fill={primaryColor}
      />

      <Rect
        x={x + taskDuration * task.progress}
        y={y}
        height={barHeight}
        width={taskDuration - taskDuration * task.progress}
        strokeWidth={2}
        fill={secondaryColor}
      />

      <Text
        fill={textColor}
        stroke={textColor}
        fontSize={12}
        textAnchor="start"
        x={x + 10}
        y={y + (barHeight + 10) / 2}
      >
        {task.name}
      </Text>
    </G>
  )
}

export default Bar
