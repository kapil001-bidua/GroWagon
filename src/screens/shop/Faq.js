import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Accordian from '../../components/UI/Accordian';
import {Colors} from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          title: 'Can I get a free trial before I purchase?',
          data:
            'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
        },
        {
          title: 'Will membership plans be charged automation?',
          data:
            'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.',
        },
        {
          title:
            'What is the difference between an individual membership and a fmaily membership? ',
          data:
            'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.',
        },
      ],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderAccordians()}
      </ScrollView>
    );
  }

  renderAccordians = () => {
    const items = [];
    for (item of this.state.menu) {
      items.push(<Accordian title={item.title} data={item.data} />);
    }
    return items;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
Faq.navigationOptions = navData => {
  return {
    headerTitle: 'FAQ',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
