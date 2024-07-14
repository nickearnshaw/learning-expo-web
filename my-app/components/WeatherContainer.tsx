import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './Weather';

export const API_KEY = '0dad96516f509d333f7ef4f79a2a3802';

const WeatherContainer = () => {
  const [state, setState] = useState<{
    isLoading: boolean;
    temperature: number;
    error: string | null;
  }>({
    isLoading: true,
    temperature: 0,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = (lat = 25, lon = 25) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
        .then(res => res.json())
        .then(json => {
          setState({
            temperature: json.main.temp,
            isLoading: false,
            error: null,
          });
        })
        .catch(error => {
          setState(s => ({ ...s, error: 'Error Getting Weather Conditions' }));
        });
    };

    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        setState(s => ({ ...s, error: 'Error Getting Weather Conditions' }));
      }
    );
  }, []); // Empty dependency array means this effect runs once on mount

  const { isLoading, temperature, error } = state;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Weather temperature={temperature} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeatherContainer;