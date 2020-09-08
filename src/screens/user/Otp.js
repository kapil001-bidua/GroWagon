import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
  CheckBox,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {saveUser} from '../../store/actions/index';
import axios from 'axios';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
const OtpKey = 'otp';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const STORAGE_KEY = '@save_age';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

async function retrieveItem(key) {
  try {
    let retrievedItem = await AsyncStorage.getItem(key);
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
}

let test = retrieveItem(STORAGE_KEY);

const AuthScreen = props => {
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [age, setAge] = useState('');
  //const dispatch = useDispatch();

  useEffect(() => {
    console.log(test);
  }, []);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      OTP: '',
    },
    inputValidities: {
      OTP: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    console.log(test._55, 'kapil');
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const Otp = async () => {
    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/Login/verifyOTP', {
        MobileNo: test._55,
        OTP: formState.inputValues.OTP,
      })
      .then(res => {
        console.log(res.data.Result);
        if (res.status === 200) {
          props.navigation.navigate('Shop');
          console.log(res.status);
          AsyncStorage.setItem('user_id', formState.inputValues.OTP);
          AsyncStorage.setItem('id_customer', res.data.Result[0].id_customer);
          console.log(res.data.Result[0].id_customer);
          Toast.show('successfully');
        } else {
          Toast.show('failed ');
        }
      })
      .catch(function(error) {
        Toast.show('result:' + error);
      });
  };

  const authHandler = async () => {
    if (formState.inputValues.OTP.length < 6) {
      setError(null);
      setIsLoading(true);
      console.log(user.MobileNo);
    } else {
      try {
        Otp();
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
  const {user} = props;
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={10} style={styles.screen}>
      <View style={styles.gradient}>
        <TouchableOpacity
          style={{
            width: '90%',
          }}
          onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-round-back" size={25} color="black" />
        </TouchableOpacity>

        <Card style={styles.authContainer}>
          <ScrollView>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.green_color,
              }}>
              Please enter OTP
            </Text>
            <Text style={{fontWeight: 'bold', marginTop: 10}}>
              We've send you a SMS with 6-digit verification coder
            </Text>
            <Input
              id="OTP"
              label="OTP"
              keyboardType="number-pad"
              required
              minLength={6}
              maxLength={6}
              autoCapitalize="none"
              errorText="Please enter a otp password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={authHandler}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: Colors.green_color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="md-arrow-round-forward"
                  size={25}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  authContainer: {
    width: '90%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    marginTop: 40,
  },

  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: Colors.light_gray,
    fontSize: 13,
  },
});

const mapStateToProps = state => ({user: state.saveUser});
const mapDispatchToProps = {
  saveUser,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthScreen);
