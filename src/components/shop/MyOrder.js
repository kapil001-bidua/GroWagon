import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';
import Card from '../UI/Card';
import Color from '../../constants/Colors';
const ProductItem = props => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    //console.log(mobile);
    //console.log(AsyncStorage.getItem('id_customer'));
    getData();
  }, []);
  const getData = async () => {
    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/User/myOrders', {
        userId: '63',
        mobileNo: '9205114537',
      })
      .then(function(response) {
        // handle success
        console.log(response.data.Result);

        setData(response.data.Result[0].order_data);
        setData2(response.data.Result);

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#E7E7E7',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,

          marginBottom: 10,
        }}>
        <Text style={{color: '#999'}}>Placed for {props.place1}</Text>
      </View>
      <Text style={{textAlign: 'center', marginTop: 10}}>
        Placed for {props.place}
      </Text>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View
            style={{
              borderRadius: 1,
              borderWidth: 1.0,
              borderColor: '#999',
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Ionicons
                name="calendar"
                size={20}
                color="orange"
                style={{padding: 10}}
              />
              <Text style={{padding: 10}}>Delivered By Grofers</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
              }}>
              <Image style={styles.image} source={{uri: props.image}} />
              <View style={{width: '90%'}}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'open-sans-bold',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    Super Store - Gurgaon
                  </Text>
                  <Text>₹ {props.total_amount}</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.title}>Delivery Change</Text>
                  <Text>Free</Text>
                </View>

                <Text style={styles.title}>Oder ID: {props.oder}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons name="check-circle" size={20} color="green" />
                  <Text style={{color: 'green', marginLeft: 10}}>
                    Delivered
                  </Text>
                </View>
              </View>

              <View style={styles.actions}>{props.children}</View>
            </View>
          </View>
        </TouchableCmp>
        <View style={{width: '100%', height: 1, backgroundColor: '#E7E7E7'}} />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
        }}>
        <Text>Final paid amount </Text>
        <Text>₹ 2000</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          padding: 15,
          marginTop: 10,
          marginBottom: 10,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>View Datails</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'white',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '35%',
    height: '80%',
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    height: '50%',
    width: '10%',
    marginRight: 10,
  },
  details: {
    marginLeft: 10,
    marginTop: 5,
    height: '10%',
    width: '100%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    color: '#999',
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '26%',
  },
});

export default ProductItem;
