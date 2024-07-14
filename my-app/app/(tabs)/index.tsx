
import Weather from '@/components/Weather';
import WeatherContainer from '@/components/WeatherContainer';
import { StyleSheet, Text, View } from 'react-native';


export default function Today() {
    return (
      <View style={styles.weather}>
        <WeatherContainer/>
    </View>
      );
} 

const styles = StyleSheet.create({
  weather: {
    flex: 1,
    width: '100%',
  }
});