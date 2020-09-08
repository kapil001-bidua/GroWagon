import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Share,
  Modal,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import Colors from '../constants/Colors';
import axios from 'axios';
import Profile from '../components/UI/Profile';
import AsyncStorage from '@react-native-community/async-storage';
// Define a variable for selected screen index
global.selectedScreenIndex = 0;

export default class CustomMenuSidebar extends Component {
  constructor() {
    super();

    // Main Top Large Image of the Custom Sidebar
    this.headerImage =
      'http://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg';
    // OptionsList which will used in map loop in render method
    this.optionsList = [
      {
        navOptionTitle: 'Home',
        screenToNavigate: 'Home',
      },
      {
        navOptionTitle: 'Profile',
        screenToNavigate: 'Profile',
      },

      {
        navOptionTitle: 'Notifications',
        screenToNavigate: 'Notifications',
      },
      {
        navOptionTitle: 'FAQ',
        screenToNavigate: 'Faq',
      },
      {
        navOptionTitle: 'MyOrders',
        screenToNavigate: 'MyOrders',
      },
    ];
  }
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  logout = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  onShare = async () => {
    try {
      const result = Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.containerSideMenu}>
        {/*Navigation Bar header  Image */}

        <View style={styles.logo}>
          <Profile />
        </View>

        {/*Divider between header Image and options*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from jsonArray using loop*/}
        <View style={{width: '100%'}}>
          {this.optionsList.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor:
                  global.selectedScreenIndex === key ? '#fff' : '#ffffff',
              }}>
              <View style={{marginRight: 10, marginLeft: 20}} />
              <Text
                style={{
                  fontSize: 15,
                  color:
                    global.selectedScreenIndex === key
                      ? Colors.green_color
                      : 'black',
                }}
                onPress={() => {
                  global.selectedScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionTitle}
              </Text>
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: '#ffffff',
            }}>
            <View style={{marginRight: 10, marginLeft: 20}} />
            <Text
              onPress={this.onShare}
              style={{
                fontSize: 15,
                color: 'black',
              }}>
              Refer App
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: '#ffffff',
            }}>
            <View style={{marginRight: 10, marginLeft: 20}} />
            <Text
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={{
                fontSize: 15,
                color: 'black',
              }}>
              Logout
            </Text>
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
              <Text style={styles.modalText}>Are you sure</Text>
              <View
                style={{width: '100%', height: 1, backgroundColor: '#999'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                  style={styles.textStyle}>
                  Cancel
                </Text>
                <View
                  style={{width: 1, height: '100%', backgroundColor: '#999'}}
                />
                <Text onPress={this.logout} style={styles.textStyle}>
                  Log out
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    resizeMode: 'cover',
    width: 150,
    height: 150,
  },
  containerSideMenu: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    width: '60%',
    margin: 80,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,

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
    color: '#2196F3',
    fontWeight: 'bold',
    margin: 15,

    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
});
