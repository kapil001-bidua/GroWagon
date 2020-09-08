import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {increment, decrement, reset} from '../store/action/cart';

class Child extends Component {
  render() {
    const {counter, increment, decrement, reset} = this.props;
    console.log('child', this.props.count);
    return (
      <View>
        <Button title="hb" onPress={increment} />
        <Text style={styles.text}>{reset}</Text>
        <Button title="Decrease" bgColor="orange" onPress={decrement} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Child);

const styles = StyleSheet.create({
  text: {
    fontSize: 100,
    color: '#000',
  },
});
