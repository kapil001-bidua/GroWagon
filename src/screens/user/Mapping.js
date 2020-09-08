/* import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-community-geolocation';
const {width, height} = Dimensions.get('window');

class CurrentPosition extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: '',
        longitude: '',
        latitudeDelta: '',
        longitudeDelta: '',
        accuracy: '',
      },
    };
  }

  calDelta(lat, long, accuracy) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    this.setState({
      region: {
        latitude: lat,
        longitude: long,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
        accuracy: accuracy,
      },
    });
  }

  componentWillMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        this.calDelta(lat, long, accuracy);
      },

      error => {
        console.log(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  marker() {
    return {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    };
  }

  render() {
    console.log(this.state.region);
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.state.region}>
            <MapView.Marker
              coordinate={this.marker()}
              title="You"
              description="You are here!"
              pinColor="green"
            />
          </MapView>
        ) : (
          <Text>cordinates not found</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    width: width,
    height: height,
    flex: 1,
  },
});

export default CurrentPosition;
*/

import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

export default class LocationDemo extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      Address: null,
    };
  }

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,

          longitude: position.coords.longitude,
        });
        Geocoder.init('AIzaSyAvU91l_bVUo9UB_y4zOS-gT4jf7Ch5EYU'); // use a valid API key
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var location = json.results[0].geometry.location;
            console.log(location);
            alert(location);
          })
          .catch(error => console.warn(error));
      },
      error => {
        // See error code charts below.
        this.setState({error: error.message}),
          console.log(error.code, error.message);
        alert(error);
      },
    );
  }

  kapil = () => {
    console.log(this.state.latitude),
      console.log(this.state.longitude),
      Geocoder.init('AIzaSyBKbrL67HfQGgltq1g6wa8mresql0Ew0VE'); // use a valid API key
    // With more options
    // Geocoder.init("xxxxxxxxxxxxxxxxxxxxxxxxx", {language : "en"}); // set the language

    Geocoder.from(28.6139, 77.209)
      .then(json => {
        var addressComponent = json.results[0];
        console.log(addressComponent);
        alert(addressComponent.long_name);
      })
      .catch(error => {
        alert(error);
        console.warn(error);
      });
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.text}> Latitude = {this.state.latitude}</Text>
        <Text style={styles.text} onPress={this.kapil}>
          {' '}
          Longitude = {this.state.longitude}
        </Text>
        <Text style={styles.text}>{this.state.Address}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 11,
  },
  text: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
});
