import React, {Component} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      task_array: [],
    };
  }

  ChangeText = some_task => {
    this.setState({task: some_task});
  };
  pushAdd = () => {
    let contact = {
      name: this.state.task,
      counter: 0,
    };
    this.setState({task_array: [...this.state.task_array, contact]});
  };

  renderListItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <ListItem title={item.name} style={{width: '75%', marginLeft: 20}} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'blueviolet',
              height: 20,
              width: 20,
              borderRadius: 50,
            }}
            onPress={() =>
              (item = {name: item.name, counter: item.counter + 1})
            }>
            <Text>+</Text>
          </TouchableOpacity>
          <Text>{item.counter}</Text>
          //main problem{' '}
          <TouchableOpacity
            style={{
              backgroundColor: 'blueviolet',
              height: 20,
              width: 20,
              borderRadius: 50,
            }}
            onPress={() =>
              (item = {name: item.name, counter: item.counter - 1})
            }>
            <Text>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: 'mediumturquoise',
          width: '100%',
          height: '100%',
        }}>
        <FlatList
          data={this.state.task_array}
          renderItem={this.renderListItem}
          keyExtractor={item => item.name}
        />
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            onChangeText={this.ChangeText}
            style={{
              backgroundColor: 'burlywood',
              height: 50,
              width: '75%',
              borderRadius: 30,
              marginBottom: 20,
              marginLeft: 20,
              marginRight: 20,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'chocolate',
              height: 40,
              width: 50,
              borderRadius: 10,
              marginBottom: 20,
            }}
            onPress={this.pushAdd}
          />
        </View>
      </View>
    );
  }
}

export default App;
