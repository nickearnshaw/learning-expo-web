import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './Weather';

export const API_KEY = '0dad96516f509d333f7ef4f79a2a3802';

export default class weatherContainer extends Component {
  state = {
    isLoading: true,
    temperature: 0,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          isLoading: false,
        });
      });
  }


  render() {
    const { isLoading, temperature } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          <Weather temperature={temperature} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});