/*
import React from 'react';
import Colors from '../../constants/Colors';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
const RadioButton = (props: any) => {
  const select = (address_id: any) => {
    props.onSelecting(address_id);
  };
  const {buttonContainer, button, checkedButton} = styles;

  return (
    <TouchableOpacity
      onPress={() => select(props.address_id)}
      style={{
        margin: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#E7E7E7',
      }}>
      <TouchableOpacity
        onPress={() => {
          navData.navigation.navigate('Address');
        }}
        style={{
          backgroundColor: Colors.green_color,
          justifyContent: 'center',
          padding: 5,
          position: 'absolute',
          right: 0,
        }}>
        <Ionicons
          size={20}
          color={'white'}
          onPress={props.onSelect}
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => select(props.address_id)}>
          {props.selected === props.address_id && (
            <View style={styles.checkedCircle} />
          )}
        </TouchableOpacity>
        <View>
          <View style={styles.buttonContainer}>
            <View>
              <Text style={styles.home}>{props.address_tag}</Text>
              <Text style={styles.address}>{props.address_line}</Text>
              <Text style={styles.address}>{props.address_line2}</Text>
              <Text style={styles.address}>{props.pincode}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    fontSize: 13,
    color: '#999',
  },
  home: {
    fontSize: 18,
    color: 'black',
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 5,
  },
  checkedCircle: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.green_color,
  },
});
export default RadioButton;
*/

import React from 'react';
import Colors from '../../constants/Colors';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
const RadioButton = (props: any) => {
  const select = (address_id: any) => {
    props.onSelecting(address_id);
  };

  return (
    <TouchableOpacity
      onPress={() => select(props.address_id)}
      style={{
        margin: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#E7E7E7',
      }}>
      <TouchableOpacity
        onPress={() => {
          navData.navigation.navigate('Address');
        }}
        style={{
          backgroundColor: Colors.green_color,
          justifyContent: 'center',
          padding: 5,
          position: 'absolute',
          right: 0,
        }}>
        <Ionicons
          size={20}
          color={'white'}
          onPress={props.onSelect}
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => select(props.address_id)}>
          {props.selected === props.address_id && (
            <View style={styles.checkedCircle} />
          )}
        </TouchableOpacity>
        <View>
          <View style={styles.buttonContainer}>
            <View>
              <Text style={styles.home}>{props.address_tag}</Text>
              <Text style={styles.address}>{props.address_line}</Text>
              <Text style={styles.address}>{props.address_line2}</Text>
              <Text style={styles.address}>{props.pincode}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    fontSize: 13,
    color: '#999',
  },
  home: {
    fontSize: 18,
    color: 'black',
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 5,
  },
  checkedCircle: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.green_color,
  },
});
export default RadioButton;
