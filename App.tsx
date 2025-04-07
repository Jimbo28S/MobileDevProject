import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from "expo-font";
import {Slot} from "expo-router";

//const useFonts = () => {
  //return Font.loadAsync({
    //"Tropicalnature": require("/assets/fonts/Tropicalnature.ttf"),
 // });
//};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Tropicalnature": require("./assets/fonts/Tropicalnature.ttf"),
  }); 
  if (!fontsLoaded) {
    return null;
  }

  return <Slot/>;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
