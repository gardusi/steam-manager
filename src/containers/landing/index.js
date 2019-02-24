import React, { Fragment } from 'react'
import BaseContainer from '../base'
import Header from '../../components/header'
import { Background } from '../../globalStyles'

class LandingContainer extends BaseContainer {
  getBackgroundStyle () {
    return { paddingBottom: this.state.viewWidth >= 500 ? '40px' : '0px' }
  }
  render () {
    const { viewWidth } = this.state
    return (
      <Fragment>
        <Header viewWidth={viewWidth} />
        <Background style={this.getBackgroundStyle()}>
        </Background>
      </Fragment>
    )
  }
}

export default LandingContainer
