# react-native-gantt-chart

Welcome to react-native-gantt-chart. We needed gantt chart for our project and couldn't find any modules. So we decided to built one! 
These are our initial commits, wait for rapid updates!

Feedbacks and PRs are always welcome :)

## Prerequisites
This library uses react-native-svg for rendering. Please make sure you installed and linked react-native-svg module.

## Installation
npm install --save react-native-gantt-chart

## Example
```
import React, { Component } from 'react'
import { View } from 'react-native'
import GanttChart from 'react-native-gantt-chart'

class Test extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      tasks: [
        { _id: "1", name: "Task 1", "start": new Date(2018, 0, 1), "end": new Date(2018, 0, 5), progress: 0.25 },
        { _id: "2", name: "Task 2", "start": new Date(2018, 0, 3), "end": new Date(2018, 0, 4), progress: 1 },
        { _id: "3", name: "Task 3", "start": new Date(2018, 0, 5), "end": new Date(2018, 0, 8), progress: 0.5 }
        ]
    }
  }
  
  render() {
    return (
        <GanttChart 
          data={this.state.tasks}
          numberOfTicks={6}
          barLineHeight={280}
          onPressTask={task => alert(task.name)}
          gridMin={new Date(2018, 0, 1).getTime()}
          gridMax={new Date(2018, 0, 20).getTime()}
          colors={{
            barColorPrimary: '#0c2461',
            barColorSecondary: '#4a69bd',
            textColor: '#fff',
            backgroundColor: '#82ccdd'
          }}
          />
    )
  }
}

export default Test
```

## Props
|Prop|Default|Description|
|---|-----|-----|
|data|required (Data Props see below)|Array of data to present|
|numberOfTicks|4|How many ticks time grid should try to render|
|onPressTask|() => {}|Callback function onPress task bar on chart|
|colors|Color Props (see below)|Color options for chart|
|gridMin|undefined|Min date for chart to start|
|gridMax|undefined|Max date for chart to end|


### Data Props
|Prop|Type|Required|Description|
|---|---|-|-----|
|_id|String|x|Unique key for each data item|
|barLineHeight|number||This will manage Axis height|
|name|String||Name to show on task bar|
|progress|Float (0 to 1)||Completed part of task as percentage|
|start|Date|x|Start date of task|
|end|Date|x|End date of task|

### Color Props
|Prop|Default|Description|
|---|---|-----|
|barColorPrimary|#0c2461|Color for completed part of task|
|barColorSecondary|#4a69bd|Color for uncomplete part of task|
|textColor|#fff|TimeGrid color and Bar text color|
|backgroundColor|#82ccdd|Background color for chart|

## License
MIT

