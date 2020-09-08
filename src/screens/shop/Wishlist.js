import React from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Wishlist from '../../components/shop/Wishlist';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

import Colors from '../../constants/Colors';

const UserProductsScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
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
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Wishlist
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 5,
              width: 25,
              borderColor: Colors.green_color,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.green_color,
              }}>
              -
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              borderWidth: 1,
              padding: 5,
              width: 25,
              textAlign: 'center',
              fontWeight: 'bold',
              borderColor: Colors.green_color,
              color: 'white',
              backgroundColor: Colors.green_color,
            }}>
            0
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 5,
              width: 25,
              borderColor: Colors.green_color,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.green_color,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </Wishlist>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Wishlist',
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
