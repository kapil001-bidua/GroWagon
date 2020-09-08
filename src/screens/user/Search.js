import React, {Component} from 'react'; // Registeation First Page and Screen
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';
import axios from 'axios'; // call to Api get
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
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
export default class RegitrationSearching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data_one: [],
      enableButton: true,
      data_two: [],
      username: 'Log in',
    };

    //this.arrayholder = [];

    this.arrayholder = [];
  }
  componentDidMount() {
    let body = {
      DeviceToken: '',
      UserId: UserId._55,
    };

    axios
      .post(
        'https://myinboxhub.co.in/demo/grocery2/apis/Services/dashboard',
        body,
      )
      .then(response => {
        console.log(response.data.Result.categries);
        this.setState(
          {
            isLoading: false,
            dataSource: response.data.Result.categries,
          },
          function() {
            this.arrayholder = response.data.Result.categries;
          },
        );
      })
      .catch(error => {
        console.error(error);
      });

    this.setState(
      {
        isLoading: false,
        dataSource: this.arrayholder,
      },
      function() {
        this.arrayholder = this.arrayholder;
      },
    );
  }
  getListViewItem(item) {
    // Alert.alert(item.battery, item.mobile_display + '\n' + item.rear_camera);
    this.props.navigation.navigate('searchSecond', {item});
  }
  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.product_name
        ? item.product_name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerView}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Icon
              name="arrowleft"
              size={25}
              color={'white'}
              onPress={() => this.props.navigation.goBack(null)}
            />
            <Text
              style={{
                textAlign: 'center',
                alignItems: 'center',
                flex: 1,
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
              }}>
              {' '}
              Search Product
            </Text>
          </View>
          <Searchbar
            searchIcon={() => false}
            // icon={()=>false}
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction('')}
            placeholder="Search"
            value={this.state.search}
            style={{fontSize: 13, color: '#212121', margin: 10}}
          />
        </View>

        <View style={styles.view} />

        <View style={styles.containers}>
          <FlatList
            // data={[(this.state.data_one, this.state.data_two)]}

            data={this.state.dataSource}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Baking', {item})}
                style={{
                  backgroundColor: 'white',
                  margin: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.textStyle}>{item.cat_name}</Text>

                <Icon
                  name={'back'}
                  style={{
                    fontSize: 25,

                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            )}
            enableEmptySections={true}
            style={{marginTop: 10}}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    padding: 10,
    fontSize: 15,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  containers: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  image: {
    height: 15,
    width: 15,
    margin: 17,
  },
  containerView: {
    padding: 10,

    backgroundColor: Colors.green_color,
    //marginTop: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  containerview: {
    alignContent: 'space-around',
    alignItems: 'center',
  },
  view: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  url: {
    width: 42,
    height: 42,
    marginLeft: 10,
    marginRight: 10,
    //marginTop: 10,
    //marginBottom: 10,
    borderRadius: 6,
  },
  TouchableOpacity: {
    margin: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
    //backgroundColor: '#F00',

    flexDirection: 'row',
    alignItems: 'center',
  },
  TouchableOpacityImage: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    //marginTop: 20,
    margin: 0,
  },
  View: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
    //marginTop: 10,
    //marginBottom: 10,
  },
  Text: {
    color: '#212121',
    fontSize: 14,
  },
  textitem: {
    color: '#9B9B9B',
    fontSize: 11,
  },
  inputContainer: {
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 290,
    marginTop: 10,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,

    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,

    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#E7E7E7',
  },
  enableButton: {
    backgroundColor: '#2873F0',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },

  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
