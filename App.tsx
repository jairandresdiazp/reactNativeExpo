import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
const images = {
  empty: require('./assets/empty.jpg'),
};

export default function App() {
  const [image, setImage] = useState('https://picsum.photos/400');
  const [permisos, setPermisos] = useState({ camara: false });
  const [imageBrowse, setImageBrowse] = useState(images.empty);
  const getPermisos = async () => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        setPermisos({ ...permisos, camara: true });
      }
    }
  };
  useMemo(async () => {
    await getPermisos();
  }, []);
  const getImage = () => {
    setImage(
      `https://picsum.photos/400?v=${(Math.random() + 1)
        .toString(36)
        .substring(7)}`
    );
  };
  const pickImageLocal = async () => {
    if (permisos.camara !== true) {
      await getPermisos();
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setImageBrowse({ uri: result.uri });
      }
    }
  };
  const shareImage = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`La opcion de compartir no esta disponible en este dispositivo`);
      return;
    }
    await Sharing.shareAsync(imageBrowse?.uri, {});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App images</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getImage();
        }}
      >
        <Text style={styles.textButton}>Change image</Text>
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          pickImageLocal();
        }}
      >
        <Image style={styles.image2} source={imageBrowse} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          shareImage();
        }}
      >
        <Text style={styles.textButton}>Share image</Text>
      </TouchableOpacity>
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
  image2: {
    marginTop: 20,
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
});
