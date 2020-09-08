import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
  Text,
  CheckBox,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {saveUser} from '../../store/actions/index';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
import ToolbarDrawer from '../../components/UI/Toolbar';
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
let UserId = retrieveItem('id_customer');
const AuthScreen = props => {
  const [isSelected, setSelection] = useState(false);
  const [icon, setIcon] = useState(
    Platform.OS === 'android' ? 'md-create' : 'ios-create',
  );
  const [isEditable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [estado, setEstado] = useState(false);
  const [error, setError] = useState();
  const [check, setcheck] = useState(false);
  const [data, setData] = useState('');
  const [age, setAge] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [image, setImage] = useState(true);
  //const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      customerName: '',
      customerMobile: '',
      addressLine1: '',
      City: '',
      State: '',
      pincode: '',
    },
    inputValidities: {
      customerName: false,
      customerMobile: false,
      addressLine1: false,
      City: false,
      State: false,
      pincode: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (formState.inputValues.customerName == '') {
      setError(null);
      setIsLoading(true);
    } else if (mobileRegex.test(formState.inputValues.customerMobile) == '') {
      setError(null);
      setIsLoading(true);
      console.log('akpo;');
    } else if (formState.inputValues.addressLine1 == '') {
      setError(null);
      setIsLoading(true);
      console.log('kapil;');
    } else if (formState.inputValues.City == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.State == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.pincode == '') {
      setError(null);
      setIsLoading(true);
    } else {
      try {
        // props.navigation.navigate('Shop');
        addressApi();

        console.log(UserId._55);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const addressApi = async () => {
    let body = {
      userId: UserId._55,
      customerName: formState.inputValues.customerName,
      customerMobile: formState.inputValues.customerMobile,
      addressLine1: formState.inputValues.addressLine1,
      addressLine2: (formState.inputValues.City, formState.inputValues.State),
      pincode: formState.inputValues.pincode,
      addressTag: 'home',
    };

    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/user/addAddress', body)

      .then(function(response) {
        // handle success

        if (response.status === 200) {
          console.log(response.status);
          props.navigation.navigate('DeliveryScreen');
          console.log(response.data);
          Toast.show('save');
        } else {
          Toast.show(' failed ');
        }
        //

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        //  alert(error.message);
      });
  };

  /* changeIcon = async () => {
    icon !== 'md-brush'
      ? (seIcon('md-pencil-sharp'), isEditable(false))
      : (seIcon('md-checkmark-outline'), isEditable(true));
  };*/
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

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ToolbarDrawer
        name="Address"
        icon={'md-checkmark'}
        onSelect={authHandler}
      />
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View>
              <Input
                id="customerName"
                label="Name"
                required
                autoCapitalize="none"
                errorText="Please enter a valid name."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="customerMobile"
                label="Mobile"
                required
                mobile
                keyboardType="number-pad"
                errorText="Please enter a valid mobile."
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="addressLine1"
                label="Address"
                required
                errorText="Please enter a valid address."
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="City"
                label="City"
                required
                errorText="Please enter a valid city."
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="State"
                label="State"
                required
                errorText="Please enter a valid state."
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="pincode"
                label="Pincode"
                required
                keyboardType="number-pad"
                errorText="Please enter a valid pincode."
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
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
    maxHeight: '100%',
    padding: 20,
    marginTop: 10,
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
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AuthScreen;
