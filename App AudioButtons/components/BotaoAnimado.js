// src/components/BotaoAnimado.js

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

export default function BotaoAnimado({ titulo, som }) {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Configurações do modo de áudio
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    // Função para carregar o som
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(som);
        if (isMounted) {
          setSound(sound);
        }
      } catch (error) {
        console.log('Erro ao carregar o som:', error);
        Alert.alert('Erro', 'Não foi possível carregar o som.');
      }
    }

    loadSound();

    // Limpeza: descarrega o som quando o componente é desmontado
    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Função para reproduzir o som
  const playSound = async () => {
    if (sound) {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.log('Erro ao reproduzir o som:', error);
        Alert.alert('Erro', 'Não foi possível reproduzir o som.');
      }
    } else {
      Alert.alert('Atenção', 'Som não está carregado ainda.');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={playSound}>
      <Text style={styles.buttonText}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333', // Cor do botão
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto branco
    fontSize: 16,
  },
});
