import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  FlatList,
  Platform,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Text,
} from 'react-native';
import Toolbar from '../../components/UI/Toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Baking from '../../components/shop/Baking';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
async function retrieveItem(key) {
  try {
    let retrievedItem = await AsyncStorage.getItem(key);
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
}

let UserId = retrieveItem('id_customer');
const UserProductsScreen = props => {
  const [isAdd, setAdd] = useState(true);
  const [isRemove, setRemove] = useState(false);
  const [isCount, setcount] = useState(0);
  const [grandTotal, setgrandTotal] = useState(0);
  const [images, setImages] = useState([]);
  const [data, setData] = useState('');
  const [top_products, setTop_products] = useState('');
  const [offers, setoffers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let body = {
      UserId: UserId._55,
      CategoryId: props.navigation.state.params.item.id,
    };

    axios
      .post(
        'https://myinboxhub.co.in/demo/grocery2/apis/Services/productList',
        body,
      )

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result.products);
        setData(response.data.Result.products);

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };

  const onSubtract = (item, index) => {
    const products = [...data];
    products[index].product_source -= 1;
    setData(data);
  };

  const updateGrandTotal = (value, op) => {
    if (op === 'add') {
      //  setgrandTotal({grandTotal: grandTotal + value});
      setgrandTotal(grandTotal + value);
    } else if (op === 'sub') {
      // this.setState({grandTotal: grandTotal - value});
      setgrandTotal(grandTotal - value);
    }
  };

  const onAdd = (item, index) => {
    const products = [...data];
    products[index].product_source += 1;
    setData(data);
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
    <View>
      <Toolbar name={props.navigation.state.params.item.cat_name} />

      <FlatList
        data={data}
        keyExtractor={item => item.product_id}
        renderItem={({item, index}) => (
          <Baking
            product_price={item.product_price}
            product_name={item.product_name}
            product_actual_img={item.product_actual_img}
            product_weight_unit={item.product_source}
            product_qty={item.product_qty}
            product_weight_unit={item.product_weight_unit}
            product_weight={item.product_weight}
            product_id={item.product_id}
            product_cat_id={item.product_cat_id}
            onSelect={() => props.navigation.navigate('ProductDetail', {item})}
          />
        )}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.state.params.item.cat_name,
  };
};

export default UserProductsScreen;
