
  /**
   * RNModal
   * import { ReactNode } from 'react';
   * type ReactText = string | number;
   * type ReactChild = ReactElement | ReactText;
   * interface ReactNodeArray extends Array<ReactNode> {}
   * type ReactFragment = {} | ReactNodeArray;
   * type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
   */

  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { Modal, TouchableWithoutFeedback } from 'react-native';
  import { View as AnimatableView } from 'react-native-animatable';
  import { screenW, screenH, styleType, buildAnimations } from '../../utils';
  import styles from './styles';

  export default class RNModal extends PureComponent {
    constructor (props) {
      super(props);
      const { animationIn, animationOut } = buildAnimations({
        animationIn: props.animationIn,
        animationOut: props.animationOut,
      });

      this.animationIn = animationIn;
      this.animationOut = animationOut;

      this.isTransitioning = false; // 锁机制
    }

    static defaultProps = {
      hasBackDrop: true,
      customBackDrop: null,
      onBackDropPress: () => null,
      useNativeDriver: false,
      backDropColor: '#000',
      avoidKeyboard: false,
      backDropOpacity: 0.7,
      animationIn: 'slideInUp',
      animationOut: 'slideOutDown',
      animationInTiming: 300,
      animationOutTiming: 300,
      onModalShow: () => null,
      onModalHide: () => null,
      onModalWillShow: () => null,
      onModalWillHide: () => null,
    };

    static propTypes = {
      hasBackDrop: PropTypes.bool, // 背景
      customBackDrop: PropTypes.node, // 自定义背景
      onBackDropPress: PropTypes.func, // 背景点击事件
      useNativeDriver: PropTypes.bool, // 使用原生动画驱动
      backDropColor: PropTypes.string, // 背景颜色
      backDropOpacity: PropTypes.number, // 背景透明度
      avoidKeyboard: PropTypes.bool, // 键盘遮挡
      children: PropTypes.node.isRequired, // 弹框主要内容
      contentStyle: styleType, // 内容container样式
      animationIn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      animationOut: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      animationInTiming: PropTypes.number,
      animationOutTiming: PropTypes.number,
      onModalShow: PropTypes.func, // modal完全显示后调用的回调函数
      onModalHide: PropTypes.func, // modal完全消失后调用的回调函数
      onModalWillHide: PropTypes.func, // modal消失动画开始前执行
      onModalWillShow: PropTypes.func, // modal显示动画开始前执行
    };

    static getDerivedStateFromProps(nextProps, state) {
      // 此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props
      // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
      if (nextProps.isVisible && !state.isVisible) {
        return {
          isVisible: true,
          showContent: true,
        }
      }
      return null;
    }

    // We use an internal state for keeping track of the modal visibility: this allows us to keep
    // the modal visible during the exit animation, even if the user has already change the
    // isVisible prop to false.
    state = {
      isVisible: this.props.isVisible,
      showContent: true,
    };

    backDropRef = React.createRef();
    contentRef = React.createRef();

    componentDidMount () {
      if (this.state.isVisible) {
        this._open();
      }
    }

    componentDidUpdate (prevProps) {
      if (this.props.backDropOpacity !== prevProps.backDropOpacity && this.backDropRef) {
        console.log(this.backDropRef.current);
      }

      if (this.props.isVisible && !prevProps.isVisible) {
        this._open();
      } else if (!this.props.isVisible && prevProps.isVisible) {
        this._close();
      }

      if (this.props.animationIn !== prevProps.animationIn ||
        this.props.animationOut !== prevProps.animationOut
      ) {
        const { animationIn, animationOut } = buildAnimations({
          animationIn: this.props.animationIn,
          animationOut: this.props.animationOut,
        });
  
        this.animationIn = animationIn;
        this.animationOut = animationOut;
      }

    }

    // 显示
    _open = () => {
      if (this.isTransitioning) {
        return;
      }
      this.isTransitioning = true;
      const { backDropOpacity, animationInTiming, isVisible, onModalShow, onModalWillShow } = this.props;
      if (this.backDropRef) {
        this.backDropRef.current.transitionTo({
          opacity: backDropOpacity,
        });
      }

      if (this.contentRef) {
        // All animations are exposed as functions on Animatable elements, they take an optional duration argument
        // {
        //   bounce: () => {},
        //   fadeIn: () => {},
        //   ...
        // }
        onModalWillShow && onModalWillShow();
        this.contentRef.current[this.animationIn](animationInTiming)
          .then(() => {
            this.isTransitioning = false;
            if (!isVisible) {
              this._close();
            } else {
              onModalShow();
            }
          });
      }
    }

    // 隐藏
    _close = () => {
      if (this.isTransitioning) {
        return;
      }
      this.isTransitioning = true;
      const { animationOutTiming, isVisible, onModalHide, onModalWillHide } = this.props;
      if (this.backDropRef) {
        this.backDropRef.current.transitionTo({
          opacity: 0,
        });
      }

      if (this.contentRef) {
        onModalWillHide && onModalWillHide();
        // 动画执行时，保持弹框打开，即使此时this.props.isVisible已经变为false
        this.contentRef.current[this.animationOut](animationOutTiming)
          .then(() => {
            this.isTransitioning = false;
            if (isVisible) {
              this._open();
            } else {
              this.setState({
                showContent: false,
              }, () => {
                this.setState({
                  isVisible: false,
                }, () => {
                  onModalHide();
                });
              });
            }
          });
      }
    }
  
    render () {
      const {
        hasBackDrop,
        onBackDropPress,
        customBackDrop,
        useNativeDriver,
        backDropColor,
        avoidKeyboard,
        children,
        contentStyle,
        backDropOpacity,
        ...otherProps
      } = this.props;

      const computedStyle = [
        { margin: screenW * 0.05, transform: [{ translateY: 0 }] },
        styles.content,
        contentStyle,
      ];

      const containerView = (
        <AnimatableView
          ref={this.contentRef}
          pointerEvents="box-none" // 视图自身不能作为触控事件的目标，但其子视图可以
          useNativeDriver={useNativeDriver}
          style={[computedStyle]}
          {...otherProps}
        >
          { this.state.isVisible && children}
        </AnimatableView>
      );

      const hasCustomBackDrop = React.isValidElement(customBackDrop);
      const backDropCustomedStyle = [{
        backgroundColor: !hasCustomBackDrop ? backDropColor : 'transparent',
        opacity: backDropOpacity,
      }];
      
      const backDropContent = (
        <AnimatableView
          ref={this.backDropRef}
          useNativeDriver={useNativeDriver}
          style={[styles.backDrop, backDropCustomedStyle]}
        >
          {hasCustomBackDrop && customBackDrop}
        </AnimatableView>
      );

      let backDrop = null;
      
      if (hasCustomBackDrop) {
        backDrop = backDropContent;
      } else {
        backDrop = (
          <TouchableWithoutFeedback onPress={onBackDropPress}>
            {backDropContent}
          </TouchableWithoutFeedback>
        );
      }

      return (
        <Modal
          transparent
          isVisible={this.state.isVisible}
          {...otherProps}
        >
          {hasBackDrop && backDrop}

          {!avoidKeyboard && containerView}
        </Modal>
      );
    }
  }
