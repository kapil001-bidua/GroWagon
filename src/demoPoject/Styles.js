import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cartButtonStyle: {
    margin: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Android
    shadowColor: 'gray', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  cartButtonTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  cartTextStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    margin: 5,
  },
  cashOnDeliveryTextStyle: {
    fontSize: 18,
    color: 'black',
  },
  cartPickerStyle: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartSeparatorStyle: {
    width: '30%',
    height: 1,
    borderStyle: 'dotted',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 1,
  },
  cartGrandTotalViewStyle: {
    margin: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
