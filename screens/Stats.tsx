import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const StatsScreen = () => {
  const [counts, setCounts] = useState({ day: 0, week: 0, month: 0, year: 0, avg: "" });
  const [chartData, setChartData] = useState({ labels: [] as string[], datasets: [{ data: [] as number[] }] });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const existing = await AsyncStorage.getItem('coffees');
      const coffees = existing ? JSON.parse(existing) : [];
      const now = new Date();
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

      const dayCount = coffees.filter((c: string) => new Date(c) > dayAgo).length;
      const weekCount = coffees.filter((c: string) => new Date(c) > weekAgo).length;
      const monthCount = coffees.filter((c: string) => new Date(c) > monthAgo).length;
      const yearCount = coffees.filter((c: string) => new Date(c) > yearAgo).length;
      const weekAvg = weekCount / 7;

      setCounts({ day: dayCount, week: weekCount, month: monthCount, year: yearCount, avg: weekAvg.toFixed(2) });

      // For chart, last 7 days
      const labels = [];
      const data = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
        const count = coffees.filter((c: string) => {
          const d = new Date(c);
          return d >= dayStart && d < dayEnd;
        }).length;
        labels.push(date.toLocaleDateString('fi-FI', { weekday: 'short' }));
        data.push(count);
      }
      setChartData({ labels, datasets: [{ data }] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.stat}>Coffees today: {counts.day}</Text>
      <Text style={styles.stat}>This week: {counts.week}</Text>
      <Text style={styles.stat}>This month: {counts.month}</Text>
      <Text style={styles.stat}>This year: {counts.year}</Text>
      <Text style={styles.chartTitle}>Last 7 Days</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        showValuesOnTopOfBars={true}
        withHorizontalLabels={true}
        fromZero={true}
        chartConfig={{
          backgroundColor: '#F5F5DC',
          backgroundGradientFrom: '#F5F5DC',
          backgroundGradientTo: '#F5F5DC',
          decimalPlaces: 0,
          barPercentage: 0.8,
          color: (opacity = 1) => `rgba(139, 69, 19, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(139, 69, 19, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#8B4513',
          },
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 0,
          paddingLeft: -30,
        }}
      />
      <Text style={styles.stat}> Average coffees a day: {(counts.avg)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#8B4513',
  },
  stat: {
    fontSize: 18,
    marginBottom: 10,
    color: '#8B4513',
  },
  chartTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#8B4513',
  },
});

export default StatsScreen;