import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }

    setLoading(true);
    setWeather(null);

    try {
      const API_KEY = 'c299e8e90381bd26dba6bb4f4d300b81'; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert('Error fetching weather data. Please check the city name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={fetchWeather} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            Temperature: {weather.main.temp}°C
          </Text>
          <Text style={styles.weatherText}>
            Description: {weather.weather[0].description}
          </Text>
          <Text style={styles.weatherText}>
            Humidity: {weather.main.humidity}%
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default App;
