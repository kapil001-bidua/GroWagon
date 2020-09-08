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

import Notifications from '../../components/shop/Notifications';
import HeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';
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

  return (
    <View style={{marginTop: 10}}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <Notifications
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            description={itemData.item.description}
          />
        )}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Notifations',
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
