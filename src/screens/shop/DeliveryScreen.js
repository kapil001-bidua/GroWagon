import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Toolbar from '../../components/UI/Toolbar';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import RadioButton from '../../components/UI/RadioButton';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker, Icon} from 'native-base';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
const STORAGE_KEY = '@save_age';
async function retrieveItem(key) {
  try {
    let retrievedItem = await AsyncStorage.getItem(key);
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
}
let mobile = retrieveItem(STORAGE_KEY);
let UserId = retrieveItem('id_customer');
const App = () => {
  const [radio, setRadio] = useState('');
  const [imgUrl, setImgUrl] = useState();
  const [err, setErr] = useState(false);
  const [dataPicker, setdataPicker] = useState('15-06-2020');
  const [dataPickers, setdataPickers] = useState('18-06-2020');
  const [selected, setSelected] = useState('key1');
  const [time, setTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('am');
  const checkRadio = (address_id: any) => {
    setRadio(address_id);
  };

  useEffect(() => {
    console.log(mobile);
    console.log(AsyncStorage.getItem('id_customer'));
    getData();
  }, []);

  const getData = async () => {
    axios
      .post(
        'https://myinboxhub.co.in/demo/grocery2/apis/user/savedAddressList',
        {
          userId: UserId._55,
          mobileNo: mobile._55,
        },
      )
      .then(function(response) {
        if (response.status == 200) {
          console.log(response.data.Result);
          setData(response.data.Result);
        } else {
          setErr(true);
        }

        // handle success

        //  alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        setErr(true);
        console.warn(error.message);
      });
  };

  const create = async () => {
    axios
      .post(
        'https://myinboxhub.co.in/demo/grocery2/apis/Services/createOrder',
        {
          userId: UserId._55,
          vendorId: '2',
          cityId: '1359',
          customerName: data.customer_name,
          customerMobile: data.customer_mobile,
          addressLine1: data.address_line,
          addressLine2: data.address_line2,
          pincode: data.pincode,
          addressTag: 'home',
          paymode: 'cash',
          scheduleDates: (dataPicker, dataPickers),
          scheduleTime: selectedValue,
          addressId: '25',
        },
      )
      .then(function(response) {
        // handle success
        console.log(response.data.Result);
        // setData(response.data.Result);
        //  alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };
  const razorpay = () => {
    var options = {
      description: 'Authentication failed due to incorrect otp',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_MrLkx9MNYdv6oY',
      amount: '5000',
      name: 'Acme Corp',
      order_id: 'order_6JUYuvmgCLfgjY', //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        email: 'kapilvidua001@gmail.com',
        contact: '9191919191',
        name: 'kapil vidua',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <View style={styles.screen}>
      <Toolbar name={'Delivery'} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Saved Address</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Address');
          }}
          style={{
            backgroundColor: Colors.green_color,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 15,
              padding: 8,
            }}>
            Add New
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          {data.map((q: any) => {
            return (
              <RadioButton
                key={q.label}
                addressLine1={q.addressLine1}
                address_line2={q.address_line2}
                pincode={q.pincode}
                address_tag={q.address_tag}
                address_id={q.address_id}
                onSelecting={checkRadio}
                selected={radio}
              />
            );
          })}
        </View>

        <View style={{margin: 10}}>
          <Text style={styles.Select}>Select Data and Time</Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            margin: 10,
            borderRadius: 1,
            padding: 10,
            borderWidth: 1,
            borderColor: '#E7E7E7',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',

                width: '20%',
              }}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
                {dataPickers}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <DatePicker
                style={{
                  fontSize: 15,
                  borderRadius: 5,
                  width: '38%',
                  borderColor: '#E7E7E7',
                  textAlign: 'center',
                  borderWidth: 1,
                }}
                date={dataPickers} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2019"
                maxDate="01-01-2050"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'relative',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {marginLeft: 10, borderColor: 'white'},
                }}
                onDateChange={dataPickers => {
                  setdataPicker(dataPickers);
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                To
              </Text>
              <DatePicker
                style={{
                  fontSize: 15,
                  borderRadius: 5,
                  width: '40%',
                  borderColor: '#E7E7E7',
                  textAlign: 'center',
                  borderWidth: 1,
                }}
                date={dataPicker} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2019"
                maxDate="01-01-2050"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'relative',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {marginLeft: 20, borderColor: 'white'},
                }}
                onDateChange={dataPicker => {
                  setdataPicker(dataPicker);
                }}
              />
            </View>
          </View>

          <View
            style={{
              width: '60%',
              position: 'relative',
              right: 0,
              left: 120,
              backgroundColor: 'white',
              marginTop: 10,
              marginBottom: 50,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: '#E7E7E7',
            }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{width: undefined}}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="10:00am - 1:00pm" value="am" />
              <Picker.Item label="1:00pm - 06:00pm" value="pm" />
            </Picker>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: Colors.green_color,
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => create()}>
        <Text style={{color: 'white', fontSize: 18}}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1},
  home: {
    fontSize: 18,
    color: 'black',
  },
  text: {
    width: '25%',
    fontSize: 15,
    borderRadius: 5,
    padding: 5,
    borderColor: '#E7E7E7',
    textAlign: 'center',
    borderWidth: 1,
  },
  Select: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 13,
    color: '#999',
  },
  summaryText: {
    fontSize: 18,
    margin: 10,
    color: '#999999',
  },
  amount: {
    color: 'black',
    margin: 10,
    fontSize: 18,
  },
});
export default App;
