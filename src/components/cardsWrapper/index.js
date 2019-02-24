import React, { PureComponent, Children } from 'react'
import styled from 'styled-components'

const List = styled.div`
  padding-top: 200px;
  display: flex;
  align-items: center;
`

export default class CardsWrapper extends PureComponent {
  getListStyle () {
    return {
      flexDirection: this.props.viewWidth >= 1080 ? 'row' : 'column'
    }
  }
  connect (children, props) {
    return Children.map(children, child => React.cloneElement(child, props))
  }
  render () {
    return (
      <List style={this.getListStyle()}>
        {this.connect(this.props.children, this.props)}
      </List>
    )
  }
}
