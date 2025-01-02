import React from 'react';
import { View, Switch, StyleSheet ,Text} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.textDarkTheme,{color:theme === 'dark' ? '#fff':'#000'}]}>{theme === 'dark' ?'Switch to Light Theme':'Switch to Dark Theme'}</Text>
      <Switch
        trackColor={{ false: "red", true: "magenta" }}
        thumbColor={theme === 'dark' ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={theme === 'dark'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
    flexDirection:'row',
    alignItems:'center'
  },
  textDarkTheme:{color: '#fff',
    marginRight: 10,
    fontWeight:'bold',
    fontSize:15
  }
});

