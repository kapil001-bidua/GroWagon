import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  LayoutAnimation,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';

import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../UI/Card';
import Colors from '../../constants/Colors';
import {add} from 'lodash';
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtyString: this.props.product_qty,
      priceString: this.props.itemPrice,
      remainingQty: this.props.itemRemainingQty,
      addvalidation: true,
      isRemove: false,
      favorite: false,
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
      ProductId: this.props.product_id,
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
        this.props.saveUser(response.data.Result[0]);
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
  ProductQty = async () => {
    let body = {
      /*
      UserId: '1',
      CouponCode: '',
      ProductId: this.props.product_id,
      ProductQty: '3',
      ProductWeight: this.props.product_weight,
      WeightUnitType: this.props.product_weight_unit,*/
      UserId: '1',
      CouponCode: '',
      ProductId: this.props.product_id,
      ProductQty: this.state.qtyString,
      ProductWeight: this.props.product_weight,
      WeightUnitType: this.props.product_weight_unit,
    };
    console.log(this.state.qtyString);
    axios
      .post('https://myinboxhub.co.in/demo/grocery2/apis/User/addToCart', body)

      .then(function(response) {
        // handle success
        console.log(response.data);
        console.log(response.data.Result[0]);
        setData(response.data.Result[0]);
        this.props.saveUser(response.data.Result[0]);
        // alert(JSON.stringify(response.data));
      })
      .catch(function(error) {
        // handle error
        alert(error.message);
      });
  };

  increaseQty = () => {
    if (this.state.qtyString < this.props.itemRemainingQty) {
      this.setState({
        qtyString: this.state.qtyString + 1,
        priceString: this.state.priceString + this.props.itemPrice,
        remainingQty: this.state.remainingQty - 1,
      });
      this.ProductQty();
      console.log(this.state.qtyString);
      this.setState({addvalidation: false});
      this.setState({isRemove: true});

      this.props.updateGrandTotal(this.props.itemPrice, 'sub');
      //  this.props.updateGrandTotal(this.props.itemPrice, 'add');
    }
  };

  decreaseQty = () => {
    if (this.state.qtyString != 1) {
      this.setState({
        qtyString: this.state.qtyString - 1,
        priceString: this.state.priceString - this.props.itemPrice,
        remainingQty: this.state.remainingQty + 1,
      });
      this.ProductQty();
      this.props.updateGrandTotal(this.props.itemPrice, 'sub');
    } else {
      this.RemoveQty();
      this.setState({addvalidation: true});
      this.setState({isRemove: false});
    }
  };
  create = () => {
    this.ProductQty();
    this.setState({addvalidation: false});
    this.setState({isRemove: true});
  };

  combinedFunction = () => {
    updateGrandTotal;
    this.props.deleteItem();
    this.props.updateGrandTotal(this.props.itemPrice, 'sub');
  };

  render() {
    const {favorite} = this.state;
    return (
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <TouchableOpacity onPress={this.props.onSelect} useForeground>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{uri: this.props.product_actual_img}}
                />
                <Text style={{color: '#FFF', fontSize: 1}}>
                  {this.props.product_cat_id}
                </Text>
              </View>
              <Text style={{color: '#FFF', fontSize: 0}}>
                {this.props.product_weight_unit}
              </Text>
              <Text style={{color: '#FFF', fontSize: 0}}>
                {this.props.product_weight}
              </Text>
              <Text style={{color: '#FFF', fontSize: 0}}>
                {this.props.product_id}
              </Text>
              <View>
                <Text style={styles.title}>{this.props.product_name}</Text>
                <Text style={styles.product_price}>
                  ${this.props.product_price}
                </Text>
                <Text
                  style={{
                    fontFamily: 'open-sans',
                    fontSize: 10,
                    color: '#888',
                  }}>
                  kg {this.props.product_qty}
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
                      onPress={this.decreaseQty}
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
                      {this.state.qtyString}
                    </Text>
                    <TouchableOpacity
                      onPress={this.increaseQty}
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
                <TouchableOpacity onPress={this.AD_TO_favorite}>
                  <Icon
                    name={favorite ? 'heart' : 'heart-o'}
                    color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
                    size={22}
                    onPress={() => this.setState({favorite: !favorite})}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
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
});

export default ProductItem;
