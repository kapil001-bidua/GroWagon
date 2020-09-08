import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  Button,
  Picker,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Colors from '../../constants/Colors';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Tab from '../../components/UI/tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toolbar from '../../components/UI/Toolbar';

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
const ProductDetailScreen = props => {
  const [isAdd, setAdd] = useState(true);
  const [isRemove, setRemove] = useState(false);
  const [favorite, setfavorite] = useState(false);
  const [isCount, setcount] = useState(1);
  const [images, setImages] = useState([]);
  const [data, setData] = useState('');
  const [checkApp, setcheckApp] = useState(false);
  const [checkCount, secheckCounta] = useState(true);
  const [top_products, setTop_products] = useState('');
  const [offers, setoffers] = useState([]);
  const [selectedValue, setSelectedValue] = useState('kg');
  const dispatch = useDispatch();

  useEffect(() => {
    setfavorite(props.favorite);
    LayoutAnimation.easeInEaseOut();
    getData();
  }, []);

  const AD_TO_favorite = async () => {
    let body = {
      UserId: UserId._55,
      ProductId: props.navigation.state.params.item.product_id,
    };

    axios
      .post(' https://myinboxhub.co.in/demo/grocery2/apis/User/addtofav', body)

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result);
        setData(response.data.Result);

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        // alert(error.message);
      });
  };

  const RemoveQty = async () => {
    let body = {
      UserId: UserId._55,
      ProductId: images.product_id,
      CouponCode: '',
    };

    axios
      .post(
        'https://myinboxhub.co.in/demo/grocery2/apis/User/removeFromCart',
        body,
      )

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result[0]);
        setData(response.data.Result[0]);

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        // alert(error.message);
      });
  };
  const kapil = () => {
    setcount(isCount + 1);
  };
  const increment = () => {
    setcount(isCount - 1 + 2);
    ProductQty();
    console.log(isCount);
    setAdd(false);
    setRemove(true);
  };

  const decrement = () => {
    if (images.product_qty <= 1) {
      console.log(isCount);
      setcount(1);
      RemoveQty();
      setAdd(true);
      setRemove(false);
    } else {
      setcount(isCount - 1);
      console.log(isCount);
    }
  };

  const getData = async () => {
    let body = {
      UserId: UserId._55,
      ProductId: props.navigation.state.params.item.product_id,
    };
    axios
      .post(
        'https://myinboxhub.co.in/demo/grocery2/apis/Services/productDetails',
        body,
      )
      .then(function(response) {
        // handle success
        console.log(response.data.Result[0]);
        setImages(response.data.Result[0]);
        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        // alert(error.message);
      });
  };

  const Add = () => {
    ProductQty();
    props.navigation.navigate('Cart');
  };

  const ProductQty = async () => {
    let body = {
      UserId: UserId._55,
      CouponCode: '',
      ProductId: images.product_id,
      ProductQty: isCount,
      ProductWeight: images.product_weight,
      WeightUnitType: images.product_weight_unit,
    };

    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/User/addToCart', body)

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result[0]);
        setData(response.data.Result[0]);
        this.props.saveUser(response.data.Result[0]);
        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        //  alert(error.message);
      });
  };

  return (
    <View>
      <Toolbar name={props.navigation.state.params.item.product_name} />

      <ScrollView>
        <View style={{flex: 1}}>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: images.product_actual_img,
              }}
            />

            <Icon
              name={favorite ? 'heart' : 'heart-o'}
              color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
              size={22}
              style={{position: 'absolute', right: 20, top: 50}}
              onPress={() => setfavorite(!favorite)}
            />
          </View>

          <View
            style={{backgroundColor: '#E7E7E7', height: 1, width: '100%'}}
          />

          <View>
            <View style={{backgroundColor: 'white'}}>
              <Text style={styles.title}>{images.product_name}</Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text style={styles.price}>${images.product_price}</Text>
                <Image
                  style={{width: 70, height: 10}}
                  source={require('../../assets/stars.png')}
                />
              </View>
              <View style={styles.actions}>
                <View>
                  <Text
                    style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                    Unit
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text>1kg </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Add();
                    }}
                    style={{
                      backgroundColor: Colors.green_color,
                      padding: 8,
                      flexDirection: 'row',

                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Ionicons
                      name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                      style={{
                        fontSize: 25,
                        color: 'white',

                        marginRight: 10,
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        paddingRight: 5,
                        fontWeight: 'bold',
                      }}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Address')}
                    style={{
                      backgroundColor: Colors.green_color,
                      padding: 8,
                      flexDirection: 'row',

                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Ionicons
                      name={Platform.OS === 'android' ? 'md-play' : 'ios-play'}
                      style={{
                        fontSize: 25,
                        color: 'white',

                        marginRight: 10,
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        paddingRight: 5,
                        fontWeight: 'bold',
                      }}>
                      Buy Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10, backgroundColor: 'white', height: 200}}>
            <Tab />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.state.params.item.product_name,
  };
};

const styles = StyleSheet.create({
  image: {
    height: 300,
  },
  actions: {
    marginVertical: 10,
    justifyContent: 'space-between',
    margin: 10,
    flexDirection: 'row',
  },
  price: {
    fontSize: 15,
    color: 'black',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginLeft: 10,

    textAlign: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    margin: 10,
    color: 'black',
  },
  Highlight: {
    fontSize: 18,
    color: 'black',
  },
  info: {
    fontSize: 18,

    marginLeft: 10,
  },
});

export default ProductDetailScreen;
