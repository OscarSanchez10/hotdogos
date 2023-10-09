import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function DiasScreen() {
  return (
    <ImageBackground source={require('./assets/fondodias.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity style={styles.button} key={index}>
            <Text style={styles.buttonText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño del contenedor
    justifyContent: 'center', // Centra contenido verticalmente
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    marginVertical: 10,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default DiasScreen;
