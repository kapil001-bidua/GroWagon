import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  FlatList,
  Platform,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MyOrder from '../../components/shop/MyOrder';
import HeaderButton from '../../components/UI/HeaderButton';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../constants/Colors';
import axios from 'axios';
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
const UserProductsScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  useEffect(() => {
    console.log(mobile);
    console.log(AsyncStorage.getItem('id_customer'));
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
        /*  let names = response.data.Result.map((order, index) => {
          console.log(oder.name);
        });
        console.log(names);*/

        //setData(response.data.Result[0].order_data);
        setData2(response.data.Result);
        setData(response.data.Result[0].order_data);
        /*
        for (let x of response.data.Result) {
          setData(response.data.Result[0].order_data);

          console.log(response.data.Result[0].order_data[0].name);
        }
*/
        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        console.log(error.message);
      });
  };
  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {},
      },
    ]);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data2}
        keyExtractor={item => item.id}
        removeClippedSubviews={false}
        bounces={false}
        renderItem={itemData => (
          <MyOrder
            image={itemData.item.icon}
            title={itemData.item.name}
            price={itemData.item.sub_total}
            oder={itemData.item.order_id}
            total_amount={itemData.item.sub_total}
            place={(itemData.item.delivery_date, itemData.item.delivery_time)}
            place1={(itemData.item.delivery_date, itemData.item.delivery_time)}
          />
        )}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'MyOrder',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
