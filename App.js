import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";
import Main from './src/Main';
import store from "./src/redux/store";

export default function App() {  
  return (
    <Provider store={store}>
    <View style={styles.container}>      
      <StatusBar style="auto" />
      <Main />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
