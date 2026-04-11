import React, { useEffect, useState,  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet, ScrollView } from 'react-native';

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
      function tsPrettifier(timestamp: string): string {
        const date = new Date(timestamp);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');

        const formatted: string = `${hh}:${min} ${dd}.${mm}.${yyyy}`;
        return formatted;
      }

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
          c0: tsPrettifier(c0),
          c1: tsPrettifier(c1),
          c2: tsPrettifier(c2),
          c3: tsPrettifier(c3),
          c4: tsPrettifier(c4),
          c5: tsPrettifier(c5),
          c6: tsPrettifier(c6),
          c7: tsPrettifier(c7),
          c8: tsPrettifier(c8),
          c9: tsPrettifier(c9)
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recently consumed coffees</Text>
      <Text style={styles.stat}>- {coffees.c0}</Text>
      <Text style={styles.stat}>- {coffees.c1}</Text>
      <Text style={styles.stat}>- {coffees.c2}</Text>
      <Text style={styles.stat}>- {coffees.c3}</Text>
      <Text style={styles.stat}>- {coffees.c4}</Text>
      <Text style={styles.stat}>- {coffees.c5}</Text>
      <Text style={styles.stat}>- {coffees.c6}</Text>
      <Text style={styles.stat}>- {coffees.c7}</Text>
      <Text style={styles.stat}>- {coffees.c8}</Text>
      <Text style={styles.stat}>- {coffees.c9}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  title: {
    margin: 30,
    fontSize: 24,
    color: '#8B4513',
  },
  stat: {
    fontSize: 18,
    marginBottom: 15,
    color: '#8B4513',
    marginLeft: 50,
  },
});

export default LogScreen;