import React from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  processColor,
} from 'react-native';
import {connect} from 'react-redux';

class App extends React.Component {
  increment = () => {
    this.props.dispatch({
      type: 'INCREMENT',
    });
  };

  decrement = () => {
    this.props.dispatch({
      type: 'DECREMENT',
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Button title="skfj" onPress={this.decrement} />
        <Text style={{color: 'black', margin: 100}}>{this.props.count}</Text>
        <Button title="skfj" onPress={this.increment} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(App);
