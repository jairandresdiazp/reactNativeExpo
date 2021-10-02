import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState('https://picsum.photos/400');
  const getImage = () => {
    setImage(
      `https://picsum.photos/400?v=${(Math.random() + 1)
        .toString(36)
        .substring(7)}`
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello world Jair</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getImage();
        }}
      >
        <Text style={styles.textButton}>Click me</Text>
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <StatusBar style="auto" />
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
  title: {
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: 20,
    padding: 5,
    borderRadius: 50,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 20,
    height: 200,
    width: 200,
    borderRadius: 200,
  },
});
