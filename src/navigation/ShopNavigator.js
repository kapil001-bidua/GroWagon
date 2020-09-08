import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Splash from '../screens/Spalsh';
import Search from '../screens/user/Search';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditProfile from '../screens/user/EditProfile';
import Mapping from '../screens/user/Mapping';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import Categories from '../screens/shop/Categories';
import OrdersScreen from '../screens/shop/OrdersScreen';
import BakingScreen from '../screens/shop/BakingScreen';
import DeliveryScreen from '../screens/shop/DeliveryScreen';
import ProfileScreen from '../screens/user/Profile';
import NotificationsScreen from '../screens/shop/Notifications';
import WishlistScreen from '../screens/shop/Wishlist';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';

import Otp from '../screens/user/Otp';
import CustomMenuSidebar from './CustomMenuSidebar';
import AuthScreen from '../screens/user/AuthScreen';
import FAq from '../screens/shop/Faq';
import Refer from '../screens/shop/ReferApp';
import MyOrder from '../screens/shop/MyOder';
import Address from '../screens/shop/Address';
import Demo from '../screens/Demo';
import demBanking from '../demoPoject/demBanking';
//Define a global color for toolbar
global.backgroundColor = '#176abf';
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.green_color : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green_color,
};

const NotificationsNavigator = createStackNavigator(
  {
    Notifications: NotificationsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);
const MyOrders = createStackNavigator(
  {
    MyOrders: MyOrder,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);
const Faq = createStackNavigator(
  {
    Faq: FAq,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);
const ReferApp = createStackNavigator(
  {
    ReferApp: Refer,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    Search: Search,
    Baking: BakingScreen,
    Categories: Categories,
    DeliveryScreen: DeliveryScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
    Address: Address,
  },
  {
    headerMode: null,
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
const CategoriesNavigator = createStackNavigator(
  {
    Categories: Categories,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const Profile = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    headerMode: null,
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const WishlistNavigator = createStackNavigator(
  {
    Wishlist: WishlistScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
  },
  {
    navigationOptions: {
      gesturesEnabled: false,

      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const BottomNavigaor = createBottomTabNavigator(
  {
    Home: ProductsNavigator,
    Notifications: NotificationsNavigator,
    Wishlist: WishlistNavigator,
    Profile: Profile,
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'Categories') {
          iconName = focused ? 'ios-grid' : 'ios-grid';
        } else if (routeName === 'Notifications') {
          iconName = focused ? 'ios-notifications' : 'ios-notifications';
        } else if (routeName === 'Wishlist') {
          iconName = focused ? 'ios-heart' : 'ios-heart';
        } else if (routeName === 'Profile') {
          iconName = focused ? 'ios-person' : 'ios-person';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.green_color,
      inactiveTintColor: 'gray',
    },
  },
);

const ShopNavigator = createDrawerNavigator(
  {
    Home: ProductsNavigator,
    Notifications: NotificationsNavigator,
    Profile: Profile,
    ReferApp: ReferApp,
    MyOrders: MyOrders,
    Setting: OrdersNavigator,
    Faq: Faq,
  },
  {
    //Custom sidebar menu we have to provide our CustomMenuSidebar
    contentComponent: CustomMenuSidebar,
    //Set sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Otp: Otp,
    EditProfile: EditProfile,
  },
  {
    headerMode: null,
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Demo: MyOrder,

  Shop: ShopNavigator,

  AdminNavigator: AdminNavigator,

  demBanking: demBanking,

  Mapping: Mapping,
  Address: Address,
  Auth: AuthNavigator,
  Splash: Splash,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
