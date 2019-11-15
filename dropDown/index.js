
  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View, TouchableWithoutFeedback, FlatList, Text, TouchableOpacity } from 'react-native';
  import { View as AnimatableView } from 'react-native-animatable';
  import RNModal from '../modal';
  import { styleType, screenUtil } from '../../utils';
  import styles from './styles';

  export default class DropDown extends PureComponent {
    static defaultProps = {
      pickerStyle: {
        height: 32,
      },
    };

    static propTypes = {
      containerStyle: styleType,
      overlayStyle: styleType,
      data: PropTypes.array.isRequired,
      pickerStyle: styleType,
      pickTextStyle: styleType,
      renderBase: PropTypes.func,
      itemContainerStyle: styleType,
      itemTextstyle: styleType,
      handleChange: PropTypes.func,
    };

    state = {
      top: 0,
      left: 0,
      pickVal: this.props.pickVal,
      isShow: false,
    };

    dropDown = React.createRef();
    dropDownContent = React.createRef();

    componentDidMount () {
      const { pickVal, data } = this.props;
      this.setState({
        pickVal: pickVal || (data.length ? data[0] : ''),
      });
    }

    componentWillReceiveProps ({ pickVal, data }) {
      if (pickVal !== this.props.pickVal ) {
        this.setState({
          pickVal,
        });
      }

      if (this.isSame(data, this.props.data)) {
        // 数据不相同时，重置状态
        this.setState({
          pickVal: data[0],
        });
      }
    }

    // 判断两个数组是否相等
    isSame = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return true;
      const arrSet = new Set(arr2);
      return arr1.filter(x => !arrSet.has(x)).length;
    }

    renderBase () {
      // dropdown头部
      // 支持自定义头部
      const { renderBase, pickerStyle, pickTextStyle } = this.props;
      if (typeof renderBase === 'function') {
        return (
          <View style={styles.head, pickerStyle}>
            { renderBase(this.state.pickVal) }
          </View>
        );
      }

      return (
        <View style={[styles.head, pickerStyle]}>
          <Text style={[styles.pickText, pickTextStyle]}>
            {this.state.pickVal}
          </Text>
        </View>
      );
    }

    _handlePress = () => {
      // 头部点击
      const { pickerStyle } = this.props;
      this.setState(prev => ({
        isShow: !prev.isShow,
      }));
      console.log(this.dropDownContent);
      if (this.dropDown) {
        this.dropDown.current.measureInWindow((x, y) => {
          this.setState({
            top: y + pickerStyle.height + 2,
            left: x,
          });
        });
      }
      
    }

    _handleItemPress = (item) => () => {
      // dropDown item click
      const { handleChange } = this.props;
      handleChange && handleChange(index);
      this.setState({
        pickVal: item,
      }, () => {
        this.setState({
          isShow: false,
        });
      });
    }

    // 关闭弹层
    _closeDropDown = () => {
      this.setState({ isShow: false });
    }

    _renderItem = ({ item, index }) => {
      const { itemContainerStyle, itemTextstyle } = this.props;
      if (!item) return null;
       
      return (
        <View key={index} style={[styles.itemContainer, itemContainerStyle]}>
          <TouchableOpacity
            onPress={this._handleItemPress(item)}
          >
            <Text style={[styles.itemText, itemTextstyle]}>{item}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    render () {
      const {
        containerStyle,
        overlayStyle,
        data,
        dropDownBodyStyle,
      } = this.props;
      const { top, left } = this.state;
      return (
        <View style={[styles.container, containerStyle]} ref={this.dropDown}>
          <TouchableWithoutFeedback onPress={this._handlePress}>
            <View pointerEvents="box-only" style={styles.baseContainer}>
              {this.renderBase()}
            </View>
          </TouchableWithoutFeedback>
          <RNModal
            isVisible={this.state.isShow}
            contentStyle={styles.modal}
            backDropOpacity={0}
            animationIn="fadeIn"
            animationOut="fadeOut"
            onBackDropPress={this._closeDropDown}
          >
            <AnimatableView
              ref={this.dropDownContent}
              style={[
                styles.dropDownBodyWrap,
                { top, left, width: '100%' },
                overlayStyle,
              ]}
            >
              <View style={[styles.dropDownBody, dropDownBodyStyle]}>
                <FlatList
                  data={data}
                  renderItem={this._renderItem}
                />
              </View>
            </AnimatableView>
          </RNModal>
        </View>
      );
    }
  }
