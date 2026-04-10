import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const LogScreen = () => {
  const [coffees, setLoggesCoffees] = useState({ 
    c0: "",
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
    c9: ""
  });

  useEffect(() => {
      loadLogs();
    }, []);
  
  const loadLogs = async () => {
    try {
      const existing = await AsyncStorage.getItem('coffees');
      const coffees = existing ? JSON.parse(existing) : [];
      if (Array.isArray(coffees)){
        const c0 = coffees[coffees?.length-1];
        const c1 = coffees[coffees?.length-2];
        const c2 = coffees[coffees?.length-3];
        const c3 = coffees[coffees?.length-4];
        const c4 = coffees[coffees?.length-5];
        const c5 = coffees[coffees?.length-6];
        const c6 = coffees[coffees?.length-7];
        const c7 = coffees[coffees?.length-8];
        const c8 = coffees[coffees?.length-9];
        const c9 = coffees[coffees?.length-10];
        setLoggesCoffees({
          c0: c0,
          c1: c1,
          c2: c2,
          c3: c3,
          c4: c4,
          c5: c5,
          c6: c6,
          c7: c7,
          c8: c8,
          c9: c9
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recently consumed coffees</Text>
      <Text style={styles.stat}> </Text>
      <Text style={styles.stat}>{coffees.c0}</Text>
      <Text style={styles.stat}>{coffees.c1}</Text>
      <Text style={styles.stat}>{coffees.c2}</Text>
      <Text style={styles.stat}>{coffees.c3}</Text>
      <Text style={styles.stat}>{coffees.c4}</Text>
      <Text style={styles.stat}>{coffees.c5}</Text>
      <Text style={styles.stat}>{coffees.c6}</Text>
      <Text style={styles.stat}>{coffees.c7}</Text>
      <Text style={styles.stat}>{coffees.c8}</Text>
      <Text style={styles.stat}>{coffees.c9}</Text>
    </ScrollView>
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
    color: '#8B4513',
  },
  stat: {
    fontSize: 18,
    marginBottom: 10,
    color: '#8B4513',
  },
});

export default LogScreen;