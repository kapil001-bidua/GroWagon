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

import Icon from 'react-native-vector-icons/AntDesign';
import {Searchbar} from 'react-native-paper';
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

    this.arrayholder = [
      {
        age: 35,
        c_id: '7669fd38-a9ac-4a5a-a688-13f08c8646cf',
        created: '2020-04-05T10:50:37.769646',
        email: 'oisin@talk2memore.com',
        first_name: 'Oisin',
        gender: 'Male',
        last_name: 'Hurley',
        modified_at: '2020-04-05T10:50:37.769655',
      },
      {
        age: 25,
        c_id: 'c286c5cc-c977-4a6b-8dd9-2c0233844f33',
        created: '2020-04-05T10:50:38.302342',
        email: 'admin@talk2memore.com',
        first_name: 'Admin',
        gender: 'Male',
        last_name: 'User',
        modified_at: '2020-04-05T10:50:38.302353',
      },
      {
        age: 0,
        c_id: 'b3d10b48-21e9-41c2-97a4-8340092c43d5',
        created: '2020-04-06T07:54:35.383231',
        email: 'joe.bloggs@gmail.com',
        first_name: 'Joe',
        gender: 'Female',
        last_name: 'Bloggs',
        modified_at: '2020-04-06T07:54:35.383239',
      },
    ];
  }
  componentDidMount() {
    /*
    axios
      .get('http://api.talk2memore.info/v1.0/customers', {
        headers: {
          'api-token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODg4Mzg5MDgsImlhdCI6MTU4NjI0NjkwOCwic3ViIjoiYjNkMTBiNDgtMjFlOS00MWMyLTk3YTQtODM0MDA5MmM0M2Q1In0.Wt-AGYRuTdURVkGMnwncTcBEWNQuycfmJC-FeABKMb0',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        this.setState(
          {
            isLoading: false,
            dataSource: res.data,
          },
          function() {
            this.arrayholder = res.data;
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
      */

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
      const itemData = item.first_name
        ? item.first_name.toUpperCase()
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
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack(null)}
            />
            <View style={styles.containerview}>
              <TextInput
                searchIcon={() => false}
                // icon={()=>false}
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={text => this.SearchFilterFunction('')}
                placeholder="Search practitioner"
                value={this.state.search}
                style={{fontSize: 13, color: '#212121'}}
              />
            </View>
          </View>
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
                style={styles.TouchableOpacity}
                onPress={this.getListViewItem.bind(this, item)}>
                <TouchableOpacity
                  onPress={this.getListViewItem.bind(this, item)}>
                  <Image
                    source={{
                      uri:
                        'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png',
                    }}
                    style={styles.url}
                  />
                </TouchableOpacity>

                <View style={styles.View}>
                  <Text
                    onPress={this.getListViewItem.bind(this, item)}
                    style={styles.Text}>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text
                    onPress={this.getListViewItem.bind(this, item)}
                    style={styles.textitem}>
                    {item.email}
                  </Text>
                </View>
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
