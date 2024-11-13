// src/telas/MenuPrincipal.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useAccelerometer from '../hooks/useAccelerometer';

export default function MenuPrincipal({ navigation }) {
  const acelerometerData = useAccelerometer(200); 
  const { x, y, z } = acelerometerData;
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  useEffect(() => {
    const normalizedX = Math.abs(x / 10);
    const normalizedY = Math.abs(y / 10);
    const normalizedZ = Math.abs(z / 10);

    const red = Math.min(255, Math.floor(normalizedZ * 255)) + 20;
    const green = Math.min(255, Math.floor(normalizedY * 255)) + 20;
    const blue = Math.min(255, Math.floor(normalizedX * 255)) + 20;

    const newRed = Math.min(255, red);
    const newGreen = Math.min(255, green);
    const newBlue = Math.min(255, blue);

    const newColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;


    setBackgroundColor(newColor);
  }, [x, y, z]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'TelaLogin' }] }), style: 'destructive' },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.titulo}>Menu Principal</Text>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('TelaMemes')}>
        <Image source={require('../../assets/imagens/memes.jpg')} style={styles.imagem} />
        <Text style={styles.textoBotao}>Memes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('TelaAnimes')}>
        <Image source={require('../../assets/imagens/anime.png')} style={styles.imagem} />
        <Text style={styles.textoBotao}>Animes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('TelaMusicas')}>
        <Image source={require('../../assets/imagens/musicas.png')} style={styles.imagem} />
        <Text style={styles.textoBotao}>Músicas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#FF00FF', // Neon Magenta
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  botao: {
    width: '80%',
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1E90FF', // Neon Blue
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  botaoSair: {
    width: '80%',
    padding: 15,
    marginTop: 30,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF1493', // Neon Pink
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  imagem: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textoBotao: {
    fontSize: 20,
    color: '#1E90FF', // Neon Blue
    fontWeight: 'bold',
    textShadowColor: '#1E90FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
