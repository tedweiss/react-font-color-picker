import React, { Component } from 'react'
import styled from 'styled-components'
import iro from '@jaames/iro'

const HexDisplay = styled.div`
  color: ${props => props.color};
  font-size: 20px;
  text-align: center;
`

class App extends Component {
  constructor () {
    super()
    this.state = { colorPicker: null, textHex: '' }
  }
  componentDidMount () {
    var colorPicker = new iro.ColorPicker('#color-picker-container', {
      // Set the size of the color picker
      width: 320,
      // Set the initial color to pure red
      color: '#f00'
    })
    this.setState({ colorPicker })
  }
  componentDidUpdate (prevProps, prevState) {
    // listen to a color picker's color:change event
    this.state.colorPicker.on('color:change', this.onColorChange)
  }

  componentWillUnmount () {
    // later, if we want to stop listening to color:change...
    // remove the color:change callback
    this.state.colorPicker.off('color:change', this.onColorChange)
  }

  // color:change event callback
  // color:change callbacks receive the current color and a changes object
  onColorChange = (color, changes) => {
    // print the color's new hex value to the developer console
    if (color.hexString !== this.state.textHex) {
      this.setState({ textHex: color.hexString })
      console.log(color.hexString)
    }
  }

  render () {
    const { textHex } = this.state
    return (
      <div className='App'>
        <div id='color-picker-container' />
        <HexDisplay color={textHex}>{textHex}</HexDisplay>
      </div>
    )
  }
}

export default App
