import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
  Platform,
  UIManager,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity
          ref={this.accordian}
          style={styles.row}
          onPress={() => this.toggleExpand()}>
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          <Icon
            name={
              this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
            }
            size={30}
            color={'black'}
          />
        </TouchableOpacity>

        {this.state.expanded && (
          <View style={styles.child}>
            <Text style={{color: '#999999'}}>{this.props.data}</Text>
          </View>
        )}
        <View style={styles.parentHr} />
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    width: '90%',

    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,

    alignItems: 'center',
  },
  parentHr: {
    height: 1,
    color: 'white',
    backgroundColor: '#999999',
    width: '100%',
    marginTop: 10,
  },
  child: {
    color: '#999999',
    marginTop: 10,
  },
});
