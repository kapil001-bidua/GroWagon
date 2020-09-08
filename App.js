/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import ShopNavigator from './src/navigation/ShopNavigator';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ShopNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

export default App;
