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
import {Avatar} from 'react-native-elements';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
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

const AuthScreen = props => {
  const [isSelected, setSelection] = useState(false);
  const [icon, setIcon] = useState('md-pencil-sharp');
  const [isEditable, setisEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [imageSource, setImageSource] = useState(null);

  //const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      isEditable: false,
    },

    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    if (formState.inputValues.Otp.length < 6) {
      setError(null);
      setIsLoading(true);
    } else {
      try {
        props.navigation.navigate('Shop');
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
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
    <KeyboardAvoidingView keyboardVerticalOffset={10} style={styles.screen}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: Colors.green_color,
          paddingTop: 20,

          padding: 10,
          width: '100%',
          paddingBottom: 20,
        }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <Icon name="left" size={25} color="white" />
        </TouchableOpacity>

        <Text
          style={{
            borderRadius: 25,
            fontSize: 18,
            marginEnd: 20,
            color: '#fff',
            fontWeight: 'bold',
            flex: 1,
          }}>
          Edit Profile
        </Text>
        <Icon name="check" size={25} color="white" />
      </View>
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.logo}>
              <View>
                {imageSource === null ? (
                  <Avatar
                    rounded
                    size="xlarge"
                    resizeMode="contain"
                    source={{
                      uri:
                        'http://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg',
                    }}
                  />
                ) : (
                  <Avatar
                    rounded
                    size="xlarge"
                    resizeMode="contain"
                    source={{uri: imageSource}}
                    resizeMode="contain"
                  />
                )}

                <TouchableOpacity
                  onPress={selectImage}
                  style={{
                    position: 'absolute',
                    right: 0,
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    shadowRadius: 8,
                    elevation: 5,
                    backgroundColor: '#FFF',
                    borderColor: 'white',
                    shadowColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                  }}>
                  <Icon name="camera" size={25} color={Colors.green_color} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{marginTop: 10, fontSize: 20}}>Basic Info</Text>
            <View>
              <Input
                id="Full_Name"
                label="Full Name"
                required
                placeholder="Kapil Vidua"
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="Email"
                label="Email"
                required
                placeholder="KapilVidua001@gmail.com"
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="Phone"
                label="Phone"
                keyboardType="number-pad"
                required
                placeholder="9111606923"
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="Address"
                label="Address"
                required
                placeholder="A-83 new awas vikas colony jhansi"
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
