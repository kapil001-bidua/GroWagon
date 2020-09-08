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
import ImagePicker from 'react-native-image-picker';
import {withNavigation} from 'react-navigation';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Avatar} from 'react-native-elements';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const STORAGE_KEY = '@save_age';

import ToolbarDrawer from '../../components/UI/DraweToolbar';
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
let test = retrieveItem(STORAGE_KEY);
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
  const [imageSource, setImageSource] = useState(null);
  const [image, setImage] = useState(true);

  //const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      address: '',
      mobile_no: '',
      first_name: '',
      email_id: '',
      isEditable: false,
    },
    inputValidities: {
      address: false,
      mobile_no: false,
      first_name: false,
      email_id: false,
    },

    formIsValid: false,
  });

  useEffect(() => {
    Profile();
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const agregarFavoritos = () => {
    let action;
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (formState.inputValues.first_name == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.LastName == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.email_id == '') {
      setError(null);
      setIsLoading(true);
    } else if (mobileRegex.test(formState.inputValues.mobile_no) == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.address == '') {
      setError(null);
      setIsLoading(true);
    } else if (imageSource) {
    } else {
      try {
        UpdateProfile();
        // props.navigation.navigate('Shop');
        console.log('knk');
        //  setEditable(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    setEstado(!estado);
    setEditable(!estado ? true : false);
    setImage(!estado ? false : true);
  };
  const Profile = async () => {
    let body = {
      UserId: UserId._55,
      MobileNo: test._55,
    };

    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/User/myProfile', body)

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result);
        setData(response.data.Result);

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };

  const UpdateProfile = async () => {
    let body = new FormData();
    body.append('UserId', UserId._55);
    body.append('MobileNo', formState.inputValues.mobile_no);
    body.append('EmailId', formState.inputValues.email_id);
    body.append('FirstName', formState.inputValues.first_name);
    body.append('LastName', formState.inputValues.LastName);
    body.append('Address', formState.inputValues.address);
    body.append('CityId', '1');
    body.append('profile_img', imageSource);

    axios
      .post(
        'https://myinboxhub.co.in/demo/grocery2/apis/User/updateProfile',
        body,
      )

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data);
        if (res.status === 200) {
          console.log(response.status);

          Toast.show('save');
        } else {
          Toast.show(' failed ');
        }
        //

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // ADD THIS
        setImageSource(source.uri);
      }
    });
  }

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
    <View style={styles.logo}>
      <Avatar
        rounded
        size="xlarge"
        resizeMode="contain"
        source={{
          uri:
            'https://3.bp.blogspot.com/-IXJBcP9tUDc/Vu5yXTXjtyI/AAAAAAAAQSA/Zqph5FjUkEMr8eRFehcFSJ8aGOlO60uXg/s1600/naughty%2Bgirl%2Bfacebook%2Bprofile%2Bpic%2Bfor%2Bgirls.jpg',
        }}
      />
      <Text>{test._55}</Text>
    </View>
  );
};

AuthScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Profile',
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
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          iconSize={30}
        />
      </HeaderButtons>
    ),
  };
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
