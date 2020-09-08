import React, {useState} from 'react';
import {FlatList, Button, Platform, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/UI/RadioButton';
import RadioButton from '../../components/UI/RadioButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/address';

const UserProductsScreen = props => {
  const [radio, setRadio] = useState('');
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const checkRadio = (value: any) => {
    setRadio(value);
  };
  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', {productId: id});
  };

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <RadioButton
          Home={itemData.item.Home}
          address={itemData.item.address}
          HomeNumber={itemData.item.HomeNumber}
          street={itemData.item.street}
          value={itemData.item.value}
          onSelecting={checkRadio}
          selected={radio}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        />
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Products',
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
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
