import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const addCoffee = async () => {
    try {
      const existing = await AsyncStorage.getItem('coffees');
      const coffees = existing ? JSON.parse(existing) : [];
      coffees.push(new Date().toISOString());
      await AsyncStorage.setItem('coffees', JSON.stringify(coffees));
      Alert.alert('Coffee logged!', 'Enjoy your coffee!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Tracker</Text>
      <TouchableOpacity style={styles.button} onPress={addCoffee}>
        <Ionicons name="cafe" size={100} color="#8B4513" />
        <Text style={styles.buttonText}>Drink Coffee</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#8B4513',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 10,
    fontSize: 18,
    color: '#8B4513',
  },
});

export default HomeScreen;