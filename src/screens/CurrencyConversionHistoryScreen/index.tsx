import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../contexts/ThemeContext';
import {getThemeStyles} from '../../styles/theme';

interface HistoryItem {
  id: string;
  baseCurrency: string;
  targetCurrency: string;
  amount: string;
  result: string;
}

export default function CurrencyConversionHistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const {isDarkTheme, toggleTheme} = useTheme();
  const styles = getThemeStyles(isDarkTheme);

  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await AsyncStorage.getItem('conversionHistory');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Conversion History</Text>
      </View>
      <ScrollView>
        {history.length > 0 ? (
          history.map(item => (
            <View key={item.id} style={[styles.divider, {padding: 15}]}>
              <Text style={styles.text}>
                {item.amount} {item.baseCurrency} → {item.result}{' '}
                {item.targetCurrency}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.text}>No conversion history available.</Text>
        )}
      </ScrollView>
    </View>
  );
}
