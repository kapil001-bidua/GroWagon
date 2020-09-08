import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  FlatList,
  Platform,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ToolbarDrawer from '../../components/UI/ToolbarDrawer';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {Carousel} from '../../components/UI/Carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Offer from '../../components/shop/Offer';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import {connect} from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
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
const ProductsOverviewScreen = props => {
  const [isAdd, setAdd] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRemove, setRemove] = useState(false);
  const [isCount, setcount] = useState(0);
  const [images, setImages] = useState([]);
  const [data, setData] = useState('');
  const [top_products, setTop_products] = useState('');
  const [offers, setoffers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  useEffect(() => {
    console.log(AsyncStorage.getItem('id_customer'));
    getData();
  }, []);

  const getData = async () => {
    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/Services/dashboard', {
        UserId: UserId._55,
        DeviceToken: '',
      })
      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result.slider);
        setImages(response.data.Result.slider);
        setIsLoading(false);

        setoffers(response.data.Result.offers);
        setData(response.data.Result.categries);
        setTop_products(response.data.Result.top_products);

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        //alert(error.message);
      });
  };
  const selectItemHandler = item => {
    props.navigation.navigate('ProductDetail', {item});
  };
  if (isLoading) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
        {/*Code to show Activity Indicator*/}
        <ActivityIndicator size="large" color={Colors.green_color} />
        {/*Size can be large/ small*/}
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <ToolbarDrawer
          name="GroWagon"
          search={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
          icon={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        />
        <View style={{backgroundColor: Colors.green_color, padding: 10}}>
          <Text style={{color: 'white'}}>Delivery Location</Text>
          <Text style={{color: 'white'}}>
            A-82 new awas vikas colony, jhansi{' '}
          </Text>
        </View>
        <ScrollView>
          <View />
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View>
              <View style={{height: '15%', marginTop: 10, width: '100%'}}>
                <Carousel images={images} />
              </View>
              <View style={{height: '10%', marginTop: 10}}>
                <Carousel images={offers} />
              </View>

              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 10,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,

                    fontWeight: 'bold',
                  }}>
                  Categories
                </Text>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    props.navigation.navigate('Categories');
                  }}>
                  <Text
                    style={{
                      color: Colors.green_color,
                      fontSize: 15,
                      marginRight: 5,
                      fontWeight: 'bold',
                    }}>
                    View All
                  </Text>
                  <Ionicons
                    size={20}
                    color={'black'}
                    name={
                      Platform.OS === 'android'
                        ? 'ios-arrow-forward'
                        : 'ios-arrow-forward'
                    }
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                horizontal={true}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Offer
                    category_banner={item.category_banner}
                    onSelect={() => props.navigation.navigate('Baking', {item})}
                    cat_name={item.cat_name}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.green_color,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white'}}>Add to Card</Text>
                    </TouchableOpacity>
                  </Offer>
                )}
              />

              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  marginLeft: 15,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                Today's Best Deals
              </Text>

              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={top_products}
                  horizontal={true}
                  keyExtractor={item => item.product_id}
                  renderItem={({item}) => (
                    <ProductItem
                      product_actual_img={item.product_actual_img}
                      product_name={item.product_name}
                      product_price={item.product_price}
                      product_cat_id={item.product_cat_id}
                      onSelect={() =>
                        props.navigation.navigate('ProductDetail', {item})
                      }>
                      <TouchableOpacity
                        style={{
                          backgroundColor: Colors.green_color,
                          width: '100%',
                          height: '50%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          dispatch(cartActions.addToCart(item));
                        }}>
                        <Text style={{color: 'white'}}>Add to Card</Text>
                      </TouchableOpacity>
                    </ProductItem>
                  )}
                />
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Hello World!</Text>

                  <TouchableHighlight
                    style={{...styles.openButton, backgroundColor: '#2196F3'}}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  }
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'GroWagon',

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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ProductsOverviewScreen;
