
  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View, Picker, TouchableWithoutFeedback, Text } from 'react-native';
  import RNModal from '../modal';
  import styles from './styles';

  export default class RNPicker extends PureComponent {
    static defaultProps = {
      cancelBtnText: '取消',
      confirmBtnText: '确认',
      cancelBtnTextColor: '#333',
      confirmBtnTextColor: '#333',
      pickerData: [],
      selectConfirm: () => {},
      toggleModal: () => {},
    };

    static propTypes = {
      pickerData: PropTypes.array,
      pickerFontColor: PropTypes.string,
      pickerFontSize: PropTypes.number,
      confirmBtnText: PropTypes.string,
      cancelBtnText: PropTypes.string,
      cancelBtnTextColor: PropTypes.string,
      confirmBtnTextColor: PropTypes.string,
      selectConfirm: PropTypes.func,
      toggleModal: PropTypes.func,
    };

    state = {
      selectedValue: this.props.selectedValue || this.props.pickerData[0],
    };

    componentDidUpdate () {
      const { isVisible, selectedValue, pickerData } = this.props;
      if (!isVisible) {
        this.setState({
          selectedValue: selectedValue || pickerData[0],
        });
      }
    }

    _toggleModal = () => {
      this.props.toggleModal(false);
    }

    _handleConfirm = () => {
      // 确认
      this.props.toggleModal(false);
      this.props.selectConfirm(this.state.selectedValue); // 回调
    }

    // 选择回调
    _handleChange = (val) => {
      this.setState({ selectedValue: val });
    }
  
    render () {
      const {
        isVisible,
        cancelBtnText,
        confirmBtnText,
        cancelBtnTextColor,
        confirmBtnTextColor,
        pickerFontColor,
        pickerFontSize,
        pickerData,
      } = this.props;
      return (
        <RNModal
          isVisible={isVisible}
          onBackDropPress={this._toggleModal}
          contentStyle={styles.modal}
          backDropOpacity={0.5}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
        >
          <View style={styles.container}>
            <View style={styles.head}>
              <TouchableWithoutFeedback onPress={this._toggleModal}>
                <Text style={[styles.headText, { color: cancelBtnTextColor }]}>
                  {cancelBtnText}
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this._handleConfirm}>
                <Text style={[styles.headText, { color: confirmBtnTextColor }]}>
                  {confirmBtnText}
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.splitLine} />
            <Picker
              selectedValue={this.state.selectedValue}
              onValueChange={this._handleChange}
              itemStyle={[pickerFontColor && { color: pickerFontColor },
                pickerFontSize && { size: pickerFontSize,
              }]}
            >
              {
                pickerData.map(item => (
                  <Picker.Item
                    label={item}
                    value={item}
                    key={item}
                  />
                ))
              }
            </Picker>
          </View> 
        </RNModal>
      );
    }
  }
