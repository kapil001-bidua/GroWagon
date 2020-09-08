import React, {Component} from 'react';
import {View, Image, Text, Alert, Button} from 'react-native';
import axios from 'axios';
class RowCartComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      qtyString: 1,
      priceString: this.props.itemPrice,
      remainingQty: this.props.itemRemainingQty,
    };
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
      UserId: '3',
      CouponCode: '',
      ProductId: '1',
      ProductQty: 1,
      ProductWeight: '1000',
      WeightUnitType: 'weight',
    };
    console.log(this.state.qtyString);
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

  increaseQty = () => {
    if (this.state.qtyString < this.props.itemRemainingQty) {
      this.setState({
        qtyString: this.state.qtyString + 1,
        priceString: this.state.priceString + this.props.itemPrice,
        remainingQty: this.state.remainingQty - 1,
      });
      this.ProductQty();
      this.props.updateGrandTotal(this.props.itemPrice, 'add');
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
      Alert.alert(
        'REMOVE ITEM?',
        'Are you sure you want to remove ' +
          `${this.props.itemName.toLowerCase()}` +
          '?',
        [{text: 'No'}, {text: 'Yes', onPress: this.combinedFunction}],
        {cancelable: true},
      );
    }
  };

  combinedFunction = () => {
    updateGrandTotal;
    this.props.deleteItem();
    this.props.updateGrandTotal(this.props.itemPrice, 'sub');
  };

  render() {
    return (
      <View style={{margin: 10, borderColor: 'black', borderWidth: 1}}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View />
          <View
            style={{
              flex: 0.6,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginBottom: 5,
              }}>
              {this.props.itemName}
            </Text>
          </View>

          <View style={{flex: 0.4, alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Button title="Add" onPress={this.decreaseQty} />

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                {this.state.qtyString}
              </Text>
              <Button title="Add" onPress={this.increaseQty} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 50,
            right: 5,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: 'black',
              marginRight: 15,
            }}>
            {'Qty Left: ' + (this.state.remainingQty - 1)}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {'RS: ' + `${this.state.priceString}`}
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            ${this.props.product_price}
            {'RS: ' + `${this.state.priceString}`}
          </Text>
          <Text
            style={{
              fontFamily: 'open-sans',
              fontSize: 10,
              color: '#888',
            }}>
            kg {this.props.product_qty}
          </Text>
        </View>
      </View>
    );
  }
}

export default RowCartComp;
