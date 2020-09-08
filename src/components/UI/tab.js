import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
const {width} = Dimensions.get('window');

class tab extends React.Component {
  state = {
    active: 0,
    xTabOne: 0, //x co-ordinate of tab one
    xTabTwo: 0, //x co-ordinate of tab two
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
    translateY: -1000,
  };
  Logout = () => {
    this.props.navigation.navigate('login');
    this.props.Logout();
    Keyboard.dismiss();
  };
  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateY,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
        }).start(),
      ]);
    }
  };
  render() {
    let {
      xTabOne,
      xTabTwo,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateY,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              height: 36,
              position: 'relative',
            }}>
            <Text
              onLayout={event =>
                this.setState({
                  xTabOne: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({active: 0}, () => this.handleSlide(xTabOne))
              }
              style={{fontSize: 18, color: active === 0 ? 'black' : '#999999'}}>
              Highlight
            </Text>

            <Text
              style={{
                fontSize: 18,

                marginLeft: 10,
              }}>
              |
            </Text>

            <Text
              onLayout={event =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({active: 1}, () => this.handleSlide(xTabTwo))
              }
              style={{
                fontSize: 18,

                marginLeft: 10,
                color: active === 1 ? 'black' : '#999999',
              }}>
              Info
            </Text>
          </View>
          <Animated.View
            style={{
              width: '25%',
              height: 2,
              top: 0,
              left: 0,
              borderBottomColor: 'red',
              backgroundColor: 'red',
              borderRadius: 4,

              transform: [
                {
                  translateX,
                },
              ],
            }}
          />
        </View>

        <ScrollView>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: translateXTabOne,
                },
              ],
            }}
            onLayout={event =>
              this.setState({
                translateY: event.nativeEvent.layout.height,
              })
            }>
            <ScrollView>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 10,
                  color: 'black',
                  marginTop: 10,
                }}>
                Description
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: '#999',
                  marginTop: 10,
                }}>
                Description is the pattern of narrative development that aims to
                make vivid a place, object, character, or group. Description is
                one of four rhetorical modes, along with exposition,
                argumentation
              </Text>
            </ScrollView>
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: translateXTabTwo,
                },
                {
                  translateY: -translateY,
                },
              ],
            }}>
            <ScrollView>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 10,
                  color: 'black',
                  marginTop: 10,
                }}>
                Description
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: '#999',
                  marginTop: 10,
                }}>
                Description is the pattern of narrative development that aims to
                make vivid a place, object, character, or group. Description is
                one of four rhetorical modes, along with exposition,
                argumentation
              </Text>
            </ScrollView>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  TouchableOpacity: {
    flex: 1,
    borderBottomColor: 'red',
  },
  TouchableOpacityView: {
    height: 50,

    position: 'relative', //Here is the trick
    bottom: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column',

    alignItems: 'center',
  },
  Logout: {
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 15,
  },
  Settings: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 5,
    paddingHorizontal: 16,

    fontSize: 16,
    color: '#000',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#000',
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#eeeeee',
    textAlign: 'center',
  },

  inputContainer: {
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 290,
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,

    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,

    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 300,
    borderRadius: 10,

    borderWidth: 1,
    borderColor: 'red',
  },
  loginButton: {
    backgroundColor: 'red',
  },
  Cacel: {
    backgroundColor: 'white',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default tab;
