import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';
import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{uri: props.category_banner}}
              />
            </View>

            <Text style={styles.title}>{props.cat_name}</Text>

            <Ionicons name="chevron-right" size={25} />
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
        <View style={{width: '100%', height: 1, backgroundColor: '#E7E7E7'}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 150,
    marginLeft: 10,
    marginEnd: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'white',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '25%',

    margin: 10,
    overflow: 'hidden',
  },
  image: {
    height: '85%',
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
    height: '26%',
  },
});

export default ProductItem;
