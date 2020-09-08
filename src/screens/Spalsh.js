import React from 'react';
import {View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  async componentDidMount() {
    setTimeout(() => {
      //  this._retrieveData();
      if (isEmpty(this.props.Result.MobileNo)) {
        this.props.navigation.replace('Auth');
      } else {
        this.props.navigation.replace('ShopNavigator');
      }
      // this._retrieveData();
    }, 2000);
    // Preload data from an external API
    // Preload data using AsyncStorage
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text>{this.props.Result.MobileNo}</Text>
        <Image
          style={{width: '75%', height: '50%'}}
          source={require('../assets/splash.png')}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
};

const mapStateToProps = state => ({user: state.saveUser});

export default connect(
  mapStateToProps,
  null,
)(SplashScreen);
