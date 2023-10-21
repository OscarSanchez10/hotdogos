import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function DiasScreen() {
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const navigateToVendidos = () => {
    navigation.navigate('Vendidos'); // Navega a la pantalla 'Vendidos'
  };

  return (
    <ImageBackground source={require('./assets/fondodias.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity style={styles.button} key={index} onPress={navigateToVendidos}>
            <Text style={styles.buttonText}>{day}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={navigateToVendidos}>
          <Text style={styles.buttonText}>Ventas</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default DiasScreen;

