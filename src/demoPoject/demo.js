import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  FlatList,
  LayoutAnimation,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../components/UI/Card';
import Toolbar from '../components/UI/Toolbar';
//https://stackoverflow.com/questions/52199140/react-native-flatlist-renderitem-not-update

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      isLoading: true,
      data_one: [],
      enableButton: true,
      data_two: [],
      username: 'Log in',
      dataSource: [],
      data: [
        {
          id: 4,
          productName: 'Product 4',
          shortDescription: 'shortDescription 4',
          qty: 1,
          price: 500,
        },
        {
          id: 5,
          productName: 'Product 5',
          shortDescription: 'shortDescription 5',
          qty: 1,
          price: 1000,
        },
        {
          id: 6,
          productName: 'Product 6',
          shortDescription: 'shortDescription 6',
          qty: 4,
          price: 1000,
        },
      ],
    };
  }
  AD_TO_favorite = async () => {
    let body = {
      UserId: '1',
      ProductId: this.props.product_id,
    };

    axios
      .post(' https://myinboxhub.co.in/demo/grocery2/apis/User/addtofav', body)

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

  RemoveQty = async () => {
    let body = {
      UserId: '1',
      ProductId: this.state.data.product_id,
      CouponCode: '',
    };

    axios
      .post(
        'https://myinboxhub.co.in/demo/grocery2/apis/User/removeFromCart',
        body,
      )

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result[0]);
        setData(response.data.Result[0]);

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };

  componentWillMount() {
    const {favorite} = this.props;
    this.setState({favorite});
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  ProductQty = async index => {
    let body = {
      UserId: '3',
      CouponCode: '',
      ProductId: this.state.dataSource[index].product_id,
      ProductQty: this.state.dataSource[index].product_qty,
      ProductWeight: this.state.dataSource[index].product_weight,
      WeightUnitType: this.state.dataSource[index].product_weight_unit,
    };
    console.log(this.state.data.product_name);
    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/User/addToCart', body)

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result[0]);
        setData(response.data.Result[0]);

        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };

  componentDidMount() {
    let body = {
      UserId: '1',
    };

    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/User/cartData', body)
      .then(response => {
        console.log(response.data.Result.cart_data[0]);
        this.setState({
          isLoading: false,
          dataSource: response.data.Result.cart_data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _addQty = index => {
    var data = this.state.dataSource;
    data[index].product_qty = data[index].product_qty + 1;
    this.setState({data: data});
    console.log(data[index].product_qty + 1);
  };

  _remoive = index => {
    var data = this.state.dataSource;

    data[index].product_qty = data[index].product_qty - 1;
    this.setState({data: data});
  };
  _getTotalPrice = () => {
    var total = 0;
    for (var i = 0; i < this.state.dataSource.length; i++) {
      total +=
        this.state.dataSource[i].product_qty *
        this.state.dataSource[i].selling_price;
    }
    return total;
  };

  _renderItem = ({item, index}) => {
    return (
      <Card style={styles.product} key={index}>
        <View style={styles.touchable}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View>
              <Text style={styles.product_price}>${item.selling_price}</Text>
              <Text
                style={{
                  fontFamily: 'open-sans',
                  fontSize: 10,
                  color: '#888',
                }}>
                kg {item.product_qty}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this._remoive(index);
                    }}
                    style={{
                      borderWidth: 1,
                      padding: 5,
                      width: 25,
                      borderColor: Colors.green_color,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.green_color,
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      borderWidth: 1,
                      padding: 5,
                      width: 25,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      borderColor: Colors.green_color,
                      color: 'white',
                      backgroundColor: Colors.green_color,
                    }}>
                    {item.product_qty}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this._addQty(index);
                    }}
                    style={{
                      borderWidth: 1,
                      padding: 5,
                      width: 25,
                      borderColor: Colors.green_color,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.green_color,
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{marginTop: 50}}>
              <Text>.</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  render() {
    return (
      <View style={styles.screen}>
        <Toolbar name={'Cart'} />
        <ScrollView>
          <View>
            <FlatList
              // data={[(this.state.data_one, this.state.data_two)]}

              data={this.state.dataSource}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={this._renderItem}
              enableEmptySections={true}
              style={{marginTop: 10}}
              keyExtractor={(item, index) => item.product_id}
            />

            <View style={{backgroundColor: 'white'}}>
              <View style={styles.summary}>
                <Text style={styles.summaryText}>Total </Text>
                <Text style={styles.amount}>$ {this._getTotalPrice()}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.summaryText}>Discont </Text>
                <Text style={styles.amount}> {this._getTotalPrice()}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.summaryText}>Delivery Charge </Text>
                <Text
                  style={{
                    color: Colors.green_color,
                    margin: 10,
                    fontSize: 18,
                  }}>
                  Free
                </Text>
              </View>

              <View style={styles.summary}>
                <Text style={styles.summaryText}>Payment Amount </Text>
                <Text style={styles.amount}>$ {this._getTotalPrice()}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{marginTop: 60}}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: Colors.green_color,
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => props.navigation.navigate('DeliveryScreen')}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  product: {
    height: 150,
    margin: 10,
    marginLeft: 10,
    marginEnd: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '35%',
    height: '80%',
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
  },
  details: {
    marginLeft: 10,
    marginTop: 5,
    height: '10%',
    width: '100%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 10,
  },
  screen: {backgroundColor: '#FFF', marginBottom: 150},
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
export default App;

/*


import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  StyleSheet,
  processColor,
} from 'react-native';
import axios from 'axios';
const products = [
  {_id: 1, name: 'Item 1', price: 50, quantity: 0},
  {_id: 2, name: 'Item 2', price: 29, quantity: 0},
  {_id: 3, name: 'Item 3', price: 200, quantity: 0},
];

const ListItem = props => {
  const [isAdd, setAdd] = useState(true);
  const [isRemove, setRemove] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCount, setcount] = useState(0);
  const [images, setImages] = useState([]);
  const [data, setData] = useState('');
  const [top_products, setTop_products] = useState('');
  const [offers, setoffers] = useState([]);
  const [grandTotal, setgrandTotal] = useState(0);

  useEffect(() => {
    ProductQty();
  }, []);
  const ProductQty = async () => {
    let body = {
      UserId: '3',
      CouponCode: '',
      ProductId: '2',
      ProductQty: '1',
      ProductWeight: '1000',
      WeightUnitType: 'weight',
    };

    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/User/addToCart', body)

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result[0]);
        setData(response.data.Result[0]);
        // this.props.saveUser(response.data.Result[0]);
        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };

  const {item} = data;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <Text>{product_name} - </Text>
        <Text>{selling_price}</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <Button title="Subtract" onPress={props.onSubtract} />
        <Text>{product_qty}</Text>
        <Button title="Add" onPress={props.onAdd} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
});

class App extends React.Component {
  state = {
    products,
    data: '',
  };

  componentWillMount() {
    this.AddToCart();
  }
  AddToCart = async () => {
    let body = {
      UserId: '1',
    };
    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/User/cartData', body)

      .then(res => {
        console.log(res.data.Result.cart_data[0]);
        console.log('@Kapil COMPONENT DID MOUNT');
        this.setState({
          data: res.data.Result.cart_data[0],
        });
      });
  };

  onSubtract = (item, index) => {
    const kapil = [...this.state.products];
    products[index].quantity -= 1;
    this.setState({products});
  };

  onAdd = (item, index) => {
    const vidua = [...this.state.products];
    vidua[index].quantity += 1;
    this.setState({products});
    this.AddToCart();
  };

  render() {
    const {products} = this.state;
    let totalQuantity = 0;
    let totalPrice = 0;
    products.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price;
    });

    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => (
            <ListItem
              item={item}
              onSubtract={() => this.onSubtract(item, index)}
              onAdd={() => this.onAdd(item, index)}
            />
          )}
          keyExtractor={item => item._id}
        />
        <Text>Total Quantity: {totalQuantity}</Text>
        <Text>Total Price: {totalPrice}</Text>
        <Text>Total Price: {this.state.data.selling_price}</Text>
      </SafeAreaView>
    );
  }
}

export default App;
*/
