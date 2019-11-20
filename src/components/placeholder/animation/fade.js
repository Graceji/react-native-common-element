/**
 * Fade动画组件
 * 不知道为什么组件写为class的形式无法实现，一定要写成函数组件的形式？？？
 */

import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { nodeType } from '../../../utils'

const START_VALUE = 0.5;
const END_VALUE = 1;
const DURATION = 500;
const useNativeDriver = true;

const Fade = ({ children, style = {}, ...props}) => {
  const animation = new Animated.Value(START_VALUE);
  (function startAnimating () {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: END_VALUE,
        duration: DURATION,
        useNativeDriver,
      }),
      Animated.timing(animation, {
        toValue: START_VALUE,
        duration: DURATION,
        useNativeDriver,
      })
    ])
    .start((e) => {
      if (e.finished) {
        startAnimating();
      }
    });
  })();

  const customStyle = { opacity: animation };
  return (
    <Animated.View style={[customStyle]} {...props}>
      {children}
    </Animated.View>
  );
}

Fade.defaultProps = {
  children: null,
};

Fade.propTypes = {
  children: nodeType,
};

export default Fade;

// export default class Fade extends PureComponent {
//   static defaultProps = {
//     children: null,
//   };

//   static propTypes = {
//     children: nodeType,
//   };

//   render () {
//     const animation = new Animated.Value(START_VALUE);
//     (function startAnimating () {
//       Animated.sequence([
//         Animated.timing(animation, {
//           toValue: END_VALUE,
//           duration: DURATION,
//           useNativeDriver,
//         }),
//         Animated.timing(animation, {
//           toValue: START_VALUE,
//           duration: DURATION,
//           useNativeDriver,
//         })
//       ])
//       .start((e) => {
//         if (e.finished) {
//           startAnimating();
//         }
//       });
//     })();
  
//     const customStyle = { opacity: animation }
//     const { children, ...props } = this.props;

//     return (
//       <Animated.View style={[customStyle]} {...props}>
//         {children}
//       </Animated.View>
//     );
//   }
// }
