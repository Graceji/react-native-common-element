/**
 * 组件模板快速生成脚本，执行npm run tep `文件名`
 * 若执行命令：npm run tep hello, process.argv的结果为：
 * [
    '/usr/local/bin/node',
    '/Users/Grace_ji/Desktop/RNElements/template',
    'hello'，
  ]
 */

const fs = require('fs');
const fileName = process.argv[2];

// 首字母大写
const firstUpperCase = str => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`

if (!fileName) {
  console.log('文件名称不能为空！');
  console.log('实例：npm run tep Test');
  process.exit(0);
}

// 页面模板
const indexTep = `
  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View } from 'react-native';
  import styles from './styles';

  export default class ${firstUpperCase(fileName)} extends PureComponent {
    render () {
      return (
        <View style={styles.container}>
          ${fileName}
        </View>
      );
    }
  }
`;

// 样式模板
const styleTep = `
  import { StyleSheet } from 'react-native';

  const styles = StyleSheet.create({
    container: {},
  });

  export default StyleSheet.flatten(styles);
`;

fs.mkdirSync(`./src/components/${fileName}`); // mkdir $1
process.chdir(`./src/components/${fileName}`); // cd $1

fs.writeFileSync('index.js', indexTep);
fs.writeFileSync('style.js', indexTep);

process.exit(0);

