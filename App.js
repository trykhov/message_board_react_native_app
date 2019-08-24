import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList } from 'react-native';
import { Input, Card, Button, Icon } from 'native-base';
import * as firebase from firebase;

// firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyC1AC08ZnST0_R3ToAxGBZ0b8Ma-clcLds",
  authDomain: "reactbootcamp-fab67.firebaseapp.com",
  databaseURL: "https://reactbootcamp-fab67.firebaseio.com",
  projectId: "reactbootcamp-fab67",
  storageBucket: "",
  messagingSenderId: "897342952156",
  appId: "1:897342952156:web:bc63d2be62e7e10c"
};


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
