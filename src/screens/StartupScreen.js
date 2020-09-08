//Import React and Hooks we needed
import React, {useState, useEffect} from 'react';
import Colors from '../constants/Colors';
//Import all required component
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const OtpKey = 'otp';
async function retrieveItem(key) {
  try {
    let retrievedItem = await AsyncStorage.getItem(key);
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
}

let test = retrieveItem(OtpKey);

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      console.log(AsyncStorage.getItem('user_id'));
      AsyncStorage.getItem('user_id').then(value =>
        props.navigation.navigate(value === null ? 'Auth' : 'Shop'),
      );
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{width: '75%', height: '50%'}}
        source={require('../assets/splash.png')}
      />
      <ActivityIndicator
        animating={animating}
        color={Colors.green_color}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
