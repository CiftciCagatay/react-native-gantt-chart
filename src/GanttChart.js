import React, { PureComponent } from 'react'
import { Dimensions, View, PanResponder } from 'react-native'
import Svg, { G } from 'react-native-svg'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import Axis from './Axis'
import Bar from './Bar'

class GanttChart extends PureComponent {
  window = Dimensions.get('window')
  barHeight = 44

  state = {
    height: this.window.height,
    width: this.window.width
  }

  _isMoving = false
  _top = 0
  _initialY = 0
  _initialTop = 0
  chartRef = null

  processTouch(y) {
    if (!this._isMoving) {
      this._isMoving = true
      this._initialTop = this._top
      this._initialY = y
    } else {
      const dy = y - this._initialY
      this._top = Math.min(this._initialTop + dy, 0)

      // react-native-svg - setNativeProps({ matrix: [scaleX, skewY, skewX, scaleY, translateX, translateY] })
      this.chartRef.setNativeProps({ matrix: [1, 0, 0, 1, 0, this._top] })
    }
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: event => {
        const { touches } = event.nativeEvent

        if (touches.length === 1) {
          const [{ locationY }] = touches
          this.processTouch(locationY)
        }
      },
      onPanResponderRelease: () => (this._isMoving = false)
    })
  }

  _onLayout(event) {
    const {
      nativeEvent: {
        layout: { height, width }
      }
    } = event

    this.setState({ height, width })
  }

  // Calculate min/max dateTimes for TimeGrid
  calcExtent = () => {
    const { data, gridMin, gridMax } = this.props

    dateTimes = data.reduce((acc, cur) => {
      acc.push(cur.start.getTime(), cur.end.getTime())
      return acc
    }, [])

    return d3.extent([...dateTimes, gridMin, gridMax])
  }

  calcXScale = domain => {
    return d3
      .scaleTime()
      .domain(domain)
      .range([0, this.state.width])
  }

  render() {
    const { data, numberOfTicks, onPressTask, colors, barLineHeight } = this.props
    const {
      barColorPrimary,
      barColorSecondary,
      backgroundColor,
      textColor
    } = colors

    const { height, width } = this.state
    const timeAxisHeight = height / 10

    // TODO: Change with no data view
    if (!data || data.length === 0) return null

    const extent = this.calcExtent()
    const xScale = this.calcXScale(extent)

    return (
      <View
        onLayout={e => this._onLayout(e)}
        style={{ backgroundColor }}
        {...this.panResponder.panHandlers}
      >
        <Svg height={height} width={width}>
          <Axis
            height={barLineHeight}
            width={width}
            x={0}
            y={timeAxisHeight}
            ticks={numberOfTicks}
            startVal={extent[0]}
            endVal={extent[1]}
            scale={xScale}
            textColor={textColor}
          />
        </Svg>

        <Svg
          height={height - timeAxisHeight}
          width={width}
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            top: timeAxisHeight + 1.5,
            left: 0
          }}
        >
          <G x={0} y={this._top} ref={ref => (this.chartRef = ref)}>
            {data.map((task, index) => {
              return (
                <Bar
                  onPress={onPressTask}
                  key={task._id}
                  index={index}
                  startVal={task.start.getTime()}
                  endVal={task.end.getTime()}
                  scale={xScale}
                  barHeight={this.barHeight}
                  task={task}
                  primaryColor={barColorPrimary}
                  secondaryColor={barColorSecondary}
                  textColor={textColor}
                />
              )
            })}
          </G>
        </Svg>
      </View>
    )
  }
}

GanttChart.propTypes = {
  data: PropTypes.arrayOf({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    progress: PropTypes.number,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired
  }).isRequired,

  gridMax: PropTypes.number,
  gridMin: PropTypes.number,

  numberOfTicks: PropTypes.number,
  onPressTask: PropTypes.func,
  colors: PropTypes.objectOf({
    barColorPrimary: PropTypes.string,
    barColorSecondary: PropTypes.string,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string
  })
}

GanttChart.defaultProps = {
  numberOfTicks: 4,
  colors: {
    barColorPrimary: '#0c2461',
    barColorSecondary: '#4a69bd',
    textColor: '#fff',
    backgroundColor: '#82ccdd'
  },
  onPressTask: () => {}
}

export default GanttChart
