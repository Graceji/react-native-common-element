/**
 * 样式类型
 */
import PropTypes from 'prop-types';

export const styleType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.object,
  PropTypes.bool,
  PropTypes.func,
  PropTypes.arrayOf,
  PropTypes.node,
]);