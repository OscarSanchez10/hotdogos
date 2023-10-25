import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  diaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 16,
  },
  totalValue: {
    fontWeight: 'bold',
  },
  borrarButton: {
    backgroundColor: 'red',
    padding: 10,
    width: 150,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  borrarButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

function VendidosScreen({ route }) {
  const { ventas, setVentas } = route.params;

  const [ventasActualizadas, setVentasActualizadas] = useState(ventas);

  // Función para calcular el total de ventas
  const calcularTotalVentas = (diaVentas) => {
    let total = 0;
    // Precios de los productos
    const precios = {
      'Hot Dog Clásico': 35,
      'Hot Dog Perzo': 45,
      'Hot Dog Con Bacon': 50,
      'Hot Dog Con Guacamole': 60,
      'Hot Dog Vegetariano': 50,
      'Papas': 40,
      // Agrega otros productos con sus precios aquí
    };

    Object.keys(diaVentas.productos).forEach((producto) => {
      total += diaVentas.productos[producto] * precios[producto];
    });

    return total;
  };

  // Función para borrar las ventas
  const borrarVentas = () => {
    // Borramos las ventas completamente configurando un objeto vacío y actualizamos las ventas en HomeScreen.
    setVentas({});
    setVentasActualizadas({});
  }

  return (
    <View style={styles.container}>
      {Object.keys(ventasActualizadas).map((dia, index) => (
        <View key={index}>
          <Text style={styles.diaTitle}>{dia}</Text>
          {Object.keys(ventasActualizadas[dia].productos).map((producto, idx) => (
            <Text key={idx}>
              {producto}: {ventasActualizadas[dia].productos[producto]}
            </Text>
          ))}
          <Text style={styles.totalText}>
            Total Vendido: <Text style={styles.totalValue}>{calcularTotalVentas(ventasActualizadas[dia])}</Text>
          </Text>
        </View>
      ))}
      <TouchableOpacity style={styles.borrarButton} onPress={borrarVentas}>
        <Text style={styles.borrarButtonText}>Borrar Ventas</Text>
      </TouchableOpacity>
    </View>
  );
}



export default VendidosScreen;
