import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
class Toolbar extends Component {
  updateState = () => {
    this.setState({myState: 'The state is updated'});
  };
  render() {
    return (
      <View style={styles.toolbar}>
        <Icon
          name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          style={{fontSize: 28, color: 'white', marginLeft: 10}}
          onPress={() => this.props.navigation.toggleDrawer()}
        />
        <Text
          style={{
            borderRadius: 25,
            fontSize: 16,
            marginEnd: 20,
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            flex: 1,
          }}>
          {this.props.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name={this.props.search}
            style={{fontSize: 28, color: 'white', marginRight: 10}}
            onPress={() => {
              this.props.navigation.navigate('Cart');
            }}
          />
          <Icon
            name={this.props.icon}
            style={{fontSize: 28, color: 'white'}}
            onPress={this.props.onSelect}
          />
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: Colors.green_color,
    padding: 15,
    width: '100%',

    flexDirection: 'row',
  },
  toolbarButton: {
    width: 50,
    color: '#fff',
    textAlign: 'center',
  },
  toolbarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
});

export default withNavigation(Toolbar);
