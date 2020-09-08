import React, {Component} from 'react';
import {View, Text, Picker, FlatList, StyleSheet, Button} from 'react-native';
import {Container, Content} from 'native-base';

import styles from './Styles';

import RowCartComp from './RowCartComp';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [
        {
          name: 'Sub Item 1',

          price: 100,
          remainingQty: 1,
        },
        {
          name: 'Sub Item 2',

          price: 200,
          remainingQty: 1,
        },
        {
          name: 'Sub Item 3',

          price: 300,
          remainingQty: 3,
        },
        {
          name: 'Sub Item 4',

          price: 400,
          remainingQty: 4,
        },
        {
          name: 'Sub Item 5',

          price: 500,
          remainingQty: 5,
        },
        {
          name: 'Sub Item 6',

          price: 600,
          remainingQty: 6,
        },
        {
          name: 'Sub Item 7',

          price: 700,
          remainingQty: 7,
        },
        {
          name: 'Sub Item 8',

          price: 800,
          remainingQty: 8,
        },
        {
          name: 'Sub Item 9',

          price: 900,
          remainingQty: 9,
        },
        {
          name: 'Sub Item 10',

          price: 1000,
          remainingQty: 10,
        },
      ],
      grandTotal: 0,
    };
  }

  componentWillMount() {
    let total = 0;
    for (let i = 0; i < this.state.cartList.length; i++) {
      total = total + this.state.cartList[i].remainingQty;
    }
    this.setState({grandTotal: total});
  }

  updateGrandTotal = (value, op) => {
    if (op === 'add') {
      this.setState({grandTotal: this.state.grandTotal + value});
    } else if (op === 'sub') {
      this.setState({grandTotal: this.state.grandTotal - value});
    }
  };

  deleteItem = name => {
    this.setState(prevState => {
      return {
        cartList: prevState.cartList.filter(cartItem => {
          return cartItem.name !== name;
        }),
      };
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.cartPickerStyle}>
            <View style={{flex: 0.1}} />
            <View style={{flex: 0.9}}>
              <Picker
                selectedValue={this.state.language}
                style={{height: 20}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }>
                <Picker.Item label="Address A" value="A" />
                <Picker.Item label="Address B" value="B" />
                <Picker.Item label="Address C" value="C" />
              </Picker>
            </View>
          </View>

          <FlatList
            data={this.state.cartList}
            renderItem={({item}) => (
              <RowCartComp
                itemName={item.name.toUpperCase()}
                itemPrice={item.price}
                itemRemainingQty={item.remainingQty}
                deleteItem={() => this.deleteItem(item.name)}
                updateGrandTotal={this.updateGrandTotal}
              />
            )}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.cartSeparatorStyle} />
            <Text style={styles.cashOnDeliveryTextStyle}>
              {' Cash on delivery '}
            </Text>
            <View style={styles.cartSeparatorStyle} />
          </View>

          <View style={styles.cartGrandTotalViewStyle}>
            <View style={{flex: 0.6}}>
              <Text style={styles.cartTextStyle}>{'Grand Total'}</Text>
              <Text style={styles.cartTextStyle}>{'Delivery charges'}</Text>
            </View>
            <View style={{flex: 0.4, alignItems: 'flex-end'}}>
              <Text style={styles.cartTextStyle}>{this.state.grandTotal}</Text>
              <Text style={styles.cartTextStyle}>{'+ 30'}</Text>
              <View
                style={{
                  height: 1,
                  borderColor: 'black',
                  borderWidth: 1,
                  width: '70%',
                }}
              />
              <Text style={styles.cartTextStyle}>{this.state.grandTotal}</Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default CartPage;
