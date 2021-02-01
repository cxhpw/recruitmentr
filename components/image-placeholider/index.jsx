import Taro, { Component } from '@tarojs/taro'
import { Image, Block, Text, View } from '@tarojs/components'
import './index.scss'

export default class ImagePlaceholider extends Component {
  static defaultProps = {
    src: '',
    customClass: '',
    fit: 'aspectFill'
  }
  constructor(props) {
    super(props)
  }
  state = {
    loaded: false,
    error: false
  }
  static externalClasses = ['custom-class']
  static options = {
    addGlobalClass: true
  }
  imageOnLoad(e) {
    if (e.type == 'load') {
      this.setState({
        loaded: true
      })
    }
  }
  onError(e) {
    this.setState({
      error: true
    })
  }
  render() {
    const { src, customClass, fit } = this.props
    const { loaded, error } = this.state
    return (
      <Block>
        <View
          className={`custom-class ${customClass} ${!loaded ? 'loaded' : ''}`}
        >
          {error ? (
            <Text className='load_error'>图片加载失败</Text>
          ) : (
            <Image
              className='load_image'
              mode={fit}
              src={src}
              onLoad={this.imageOnLoad.bind(this)}
              onError={this.onError}
            ></Image>
          )}
        </View>
      </Block>
    )
  }
}
