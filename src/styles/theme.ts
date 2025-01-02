import {StyleSheet} from 'react-native';

export const getThemeStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkTheme ? '#333' : '#fff',
    },
    headerContainer: {
      marginBottom: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkTheme ? '#fff' : '#000',
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkTheme ? '#555' : '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      color: isDarkTheme ? '#fff' : '#000',
    },
    result: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: isDarkTheme ? '#fff' : '#000',
    },
    historyHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      color: isDarkTheme ? '#fff' : '#000',
    },
    historyItem: {
      fontSize: 16,
      marginBottom: 5,
      color: isDarkTheme ? '#fff' : '#000',
    },

    text: {
      fontSize: 16,
      color: isDarkTheme ? '#ccc' : '#000',
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? '#444' : '#ccc',
      marginVertical: 10,
    },
  });
