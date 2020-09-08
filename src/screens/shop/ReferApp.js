import * as React from 'react';
import {Button, View, Text, Image, TouchableOpacity} from 'react-native';
import Color from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Baking from '../../components/shop/Baking';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        Refer to your Friend!
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          color: '#999',
          marginTop: 10,
        }}>
        Invite your friend and earn 20 points.
      </Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../assets/icons/refer.png')}
          style={{
            width: '100%',
            height: '65%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          position: 'absolute',
          bottom: 0,
          backgroundColor: Color.green_color,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          Send Invite
        </Text>
      </TouchableOpacity>
    </View>
  );
}
HomeScreen.navigationOptions = navData => {
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
export default HomeScreen;
