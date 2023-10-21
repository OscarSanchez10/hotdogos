import React, { useState } from 'react';
import { StatusBar, Image } from 'react-native';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import DiasScreen from './Dias';
import VendidosScreen from './Vendidos';

const hotDogs = [
  { name: 'Hot Dog Clásico', price: '$35' },
  { name: 'Hot Dog Perzo', price: '$45' },
  { name: 'Hot Dog Con Bacon', price: '$50' },
  { name: 'Hot Dog Con Guacamole', price: '$60' },
  { name: 'Hot Dog Vegetariano', price: '$50' },
  { name: 'Papas', price: '40' },
];

function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'FredokaOne-Regular': FredokaOne_400Regular,
  });

  const [ventas, setVentas] = useState({});

  if (!fontsLoaded) {
    return null;
  }

  const handleVenta = (producto) => {
    const nombreDia = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const fecha = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setVentas((prevVentas) => {
      const newVentas = { ...prevVentas };
      if (!newVentas[nombreDia]) {
        newVentas[nombreDia] = { fecha, productos: {} };
      }
      newVentas[nombreDia].productos[producto] = (newVentas[nombreDia].productos[producto] || 0) + 1;

      return newVentas;
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('./assets/LogoHot.png')}
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
                onPress={() => {
                  console.log(`Tocaste el hot dog: ${hotDog.name}`);
                  handleVenta(hotDog.name);
                }}
              >
                <Text style={styles.hotDogName}>{hotDog.name}</Text>
                <Text style={styles.hotDogPrice}>{hotDog.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <StatusBar style="auto" />
        <View style={styles.bottomButton}>
          <TouchableOpacity onPress={() => navigation.navigate('Dias')}>
            <Text style={styles.bottomButtonText}>Dias</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButton}>
          <TouchableOpacity onPress={() => navigation.navigate('Vendidos', { ventas })}>
            <Text style={styles.bottomButtonText}>Ventas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: '#fcf4d4' },
          }}
        />
        <Stack.Screen
          name="Dias"
          component={DiasScreen}
          options={{
            headerStyle: { backgroundColor: '#fcf4d4' },
            title: 'Dias',
          }}
        />
        <Stack.Screen
          name="Vendidos"
          component={VendidosScreen}
          initialParams={{ ventas: {} }}
          options={{
            headerStyle: { backgroundColor: '#fcf4d4' },
            title: 'Ventas',
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    width: '100%',
  },
  contentContainer: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  leftAlignContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    width: '100%',
  },
  hotDogItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    width: '70%',
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
  imageStyle: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 150,
    height: 100,
  },
  bottomButton: {
    backgroundColor: 'red',
    padding: 10,
    width: 80,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 25,
    borderRadius: 10,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 20
  },
});
