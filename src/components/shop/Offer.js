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

import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <Card style={styles.card}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: props.category_banner}} />
          </View>
        </TouchableCmp>
      </Card>
      <View style={styles.details}>
        <Text style={{color: '#FFF', fontSize: 1}}>{props.id}</Text>
        <Text style={styles.title}>{props.cat_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 200,
    margin: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 13,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    width: 100,
    height: 100,
  },
});

export default ProductItem;
