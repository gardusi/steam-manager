import { PureComponent } from 'react'

export default class BaseContainer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { viewWidth: 0, viewHeight: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount () {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  updateWindowDimensions () {
    this.setState({ viewWidth: window.innerWidth, viewHeight: window.innerHeight })
  }
}
