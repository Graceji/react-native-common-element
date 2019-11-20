
  /**
   * 占位图
   */

  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View } from 'react-native';
  import Animations from './animation';
  import { nodeType } from '../../utils';

  const makeRoot = (animation) => {
    if (animation) {
      const Animation = Animations[animation];
      if (!Animation) {
        throw new Error(`动画 "${animation}" 不存在`);
      }
      return Animation;
    }
    return View;
  }

  export default class Placeholder extends PureComponent {
    static defaultProps = {
      animation: 'fade',
      isReady: false,
      whenReadyRender: () => {},
    };

    static propTypes = {
      animation: PropTypes.string,
      isReady: PropTypes.bool,
      children: nodeType,
      whenReadyRender: PropTypes.func,
    };
  
    render () {
      const { animation, isReady, children, whenReadyRender, style, ...otherProps } = this.props;
      const Root = makeRoot(animation); // 暂不支持定制化
      if (isReady) {
        return whenReadyRender();
      }
      return (
        <Root style={style} {...otherProps}>
          {children}
        </Root>
      );
    }
  }
