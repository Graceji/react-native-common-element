import { registerAnimation, createAnimation } from 'react-native-animatable';

const isObject = (obj) => {
  return obj !== null && typeof obj === 'object';
};

// 注册自定义动画
const makeAnimation = (name, obj) => {
  registerAnimation(name, createAnimation(obj));
}

export const buildAnimations = ({ animationIn, animationOut }) => {
  let updateAnimationIn;
  let updateAnimationOut;

  if (isObject(animationIn)) {
    const animationName = JSON.stringify(animationIn);
    makeAnimation(animationName, animationIn);
    updateAnimationIn = animationName;
  } else {
    updateAnimationIn = animationIn;
  }

  if (isObject(animationOut)) {
    const animationName = JSON.stringify(animationOut);
    makeAnimation(animationName, animationOut);
    updateAnimationOut = animationName;
  } else {
    updateAnimationOut = animationOut;
  }

  return {
    animationIn: updateAnimationIn,
    animationOut: updateAnimationOut,
  };
};
