import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Image,
  Button,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.toolbar}>
      <Icon
        name="ios-arrow-back"
        style={{fontSize: 24, color: '#eeeeee', marginLeft: 10}}
        onPress={() => props.navigation.goBack(null)}
      />
      <Text
        style={{
          borderRadius: 25,
          fontSize: 16,
          marginEnd: 20,
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          flex: 1,
        }}>
        {props.name}
      </Text>
      <TouchableOpacity onPress={props.onSelect} useForeground>
        <Icon
          name={props.icon}
          style={{fontSize: 24, color: '#eeeeee', marginLeft: 10}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default withNavigation(ProductItem);
