/**
 * 样式类型
 */
import PropTypes from 'prop-types';

export const styleType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.array,
]);