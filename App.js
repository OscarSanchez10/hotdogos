import React from 'react';
import { StatusBar, Image } from 'react-native';
import {StyleSheet,Text,View,ScrollView,TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import DiasScreen from './Dias'; // No es necesario agregar la extensión .js

// Arreglo de hot dogs y precios
const hotDogs = [
  { name: 'Hot Dog Clásico', price: '$35' },
  { name: 'Hot Dog Con Bacon', price: '$50' },
  { name: 'Hot Dog Con Guacamole', price: '$60' },
  { name: 'Hot Dog Vegetariano', price: '$200' },
  { name: 'Papas', price: '20' },
];

// Define la pantalla principal
function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'FredokaOne-Regular': FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    // Puedes manejar la lógica de carga de fuentes aquí si es necesario
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Agrega la imagen en la esquina superior derecha */}
      <Image
        source={require('./assets/LogoHot.png')} // Ajusta la ruta de la imagen
        style={styles.imageStyle}
      />

      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.menuText,
            {
              fontFamily: 'FredokaOne-Regular',
              fontSize: 50,
              color: '#8c5c4c',
            },
          ]}
        >
          MENU
        </Text>
        <Text
          style={[
            styles.hotDogsText,
            {
              fontFamily: 'FredokaOne-Regular',
              fontSize: 50,
              color: '#8c5c4c',
            },
          ]}
        >
          HOT DOG
        </Text>
      </View>
      <View style={styles.leftAlignContainer}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={false}
        >
          {hotDogs.map((hotDog, index) => (
            <TouchableOpacity
              style={styles.hotDogItem}
              key={index}
              onPress={() => console.log(`Tocaste el hot dog: ${hotDog.name}`)}
            >
              <Text style={styles.hotDogName}>{hotDog.name}</Text>
              <Text style={styles.hotDogPrice}>{hotDog.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <StatusBar style='auto' />
      {/* Agrega un botón en la esquina inferior izquierda */}
      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Dias')}>
          <Text style={styles.bottomButtonText}>Dias</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Menu'
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: '#fcf4d4' }, // Color de la barra de menú
          }}
        />
        {/* Agrega la pantalla "Dias" aquí */}
        <Stack.Screen
          name='Dias'
          component={DiasScreen}
          options={{
            headerStyle: { backgroundColor: '#fcf4d4' }, // Puedes personalizar el estilo del encabezado
            title: 'Dias', // Puedes cambiar el título del encabezado
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6cac9c',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 30,
    alignItems: 'flex-start', // Alinea los textos a la izquierda
    paddingHorizontal: 20, // Añade un espacio a la izquierda para separar del borde
    width: '100%', // Ocupa todo el ancho disponible
  },
  contentContainer: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'flex-start', // Alinea los botones a la izquierda
  },
  leftAlignContainer: {
    alignItems: 'flex-start', // Alinea todo el contenido a la izquierda
    paddingHorizontal: 20, // Añade un espacio a la izquierda para separar del borde
    width: '100%', // Ocupa todo el ancho disponible
  },
  hotDogItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    width: '70%', // Ajusta el ancho de los botones
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
  },
  menuText: {
    fontSize: 50,
  },
  hotDogsText: {
    fontSize: 50,
  },
  hotDogName: {
    fontSize: 18,
  },
  hotDogPrice: {
    fontSize: 16,
    color: '#333',
  },
  // Agrega un estilo para la imagen
  imageStyle: {
    position: 'absolute',
    top: 50, // Ajusta la posición vertical
    right: 0, // Ajusta la posición horizontal
    width: 150, // Ajusta el ancho de la imagen
    height: 100, // Ajusta la altura de la imagen
  },
  // Estilos para el botón en la esquina inferior derecha
  bottomButton: {
    backgroundColor: 'red',
    padding: 10,
    width: 70,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30, // Ajusta este valor para elevar el botón
    right: 25,
    borderRadius: 10,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 20,
  },
});