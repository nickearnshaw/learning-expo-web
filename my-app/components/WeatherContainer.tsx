import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './Weather';

export default class weatherContainer extends React.Component {
  state = {
    isLoading: false
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Weather/> : (
          <View>
            <Text>Loading</Text>
          </View>
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