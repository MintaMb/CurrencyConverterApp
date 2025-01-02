import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from '../../components/DropDown';
import {fetchConversionRate} from '../../utils/api';
import {useTheme} from '../../contexts/ThemeContext';
import {getThemeStyles} from '../../styles/theme';

interface HistoryItem {
  id: string;
  baseCurrency: string;
  targetCurrency: string;
  amount: string;
  result: string;
}

const currencyList = [
  {title: 'USD', value: 'USD', image: undefined},
  {title: 'EUR', value: 'EUR', image: undefined},
  {title: 'GBP', value: 'GBP', image: undefined},
  {title: 'INR', value: 'INR', image: undefined},
  {title: 'JPY', value: 'JPY', image: undefined},
  {title: 'AUD', value: 'AUD', image: undefined},
];

const Converter: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState<string | undefined>();
  const [targetCurrency, setTargetCurrency] = useState<string | undefined>();
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const {isDarkTheme, toggleTheme} = useTheme();
  const styles = getThemeStyles(isDarkTheme);

  const handleBaseCurrency = (selectedItem: {title: string}) => {
    setBaseCurrency(selectedItem.title);
  };

  const handleTargetCurrency = (selectedItem: {title: string}) => {
    setTargetCurrency(selectedItem.title);
  };

  const convertCurrency = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount to convert.');
      return;
    }

    try {
      const rates = await fetchConversionRate(baseCurrency);
      const rate = rates[targetCurrency];
      if (!rate) {
        Alert.alert(
          'Error',
          'Conversion rate not available for the selected currencies.',
        );
        return;
      }

      const result = (parseFloat(amount) * rate).toFixed(2);
      setConvertedAmount(result);

      const newHistory: HistoryItem[] = [
        {
          id: Date.now().toString(),
          baseCurrency,
          targetCurrency,
          amount,
          result,
        },
        ...history.slice(0, 4),
      ];

      setHistory(newHistory);
      await AsyncStorage.setItem(
        'conversionHistory',
        JSON.stringify(newHistory),
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to fetch conversion rates. Please try again.',
      );
    }
  };

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
        <Text style={styles.headerText}>Currency Converter</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>

      <DropDown
        placeholder={'Select Base Currency'}
        data={currencyList}
        selectedValue={baseCurrency}
        onSelect={handleBaseCurrency}
        buttonStyle={{
          backgroundColor: isDarkTheme ? '#444' : '#fff',
          borderColor: isDarkTheme ? '#555' : '#ccc',
          padding: 10,
        }}
        buttonTextStyle={{color: isDarkTheme ? '#fff' : '#000'}}
      />

      <DropDown
        placeholder={'Select Target Currency'}
        data={currencyList}
        selectedValue={targetCurrency}
        onSelect={handleTargetCurrency}
        buttonStyle={{
          backgroundColor: isDarkTheme ? '#444' : '#fff',
          borderColor: isDarkTheme ? '#555' : '#ccc',
          padding: 10,
        }}
        buttonTextStyle={{color: isDarkTheme ? '#fff' : '#000'}}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        placeholderTextColor={isDarkTheme ? '#aaa' : '#888'}
        onChangeText={setAmount}
      />

      <Button title="Convert" onPress={convertCurrency} />

      {convertedAmount && (
        <Text style={styles.result}>
          {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
        </Text>
      )}

      <Text style={styles.historyHeader}>Conversion History:</Text>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Text style={styles.historyItem}>
            {item.amount} {item.baseCurrency} → {item.result}{' '}
            {item.targetCurrency}
          </Text>
        )}
      />
    </View>
  );
};

export default Converter;
