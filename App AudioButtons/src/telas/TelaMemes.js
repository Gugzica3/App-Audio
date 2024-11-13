// src/telas/TelaMemes.js

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BotaoAnimado from '../../components/BotaoAnimado';

export default function TelaMemes({ navigation }) {
  const memes = [
    { titulo: 'Ow ma ga!', som: require('../../assets/sounds/meme1.mp3') },
    { titulo: 'Calma Calabreso', som: require('../../assets/sounds/meme2.mp3') },
    { titulo: 'Gegagedigedagedago', som: require('../../assets/sounds/meme3.mp3') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {memes.map((meme, index) => (
          <BotaoAnimado key={index} titulo={meme.titulo} som={meme.som} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000', // Fundo preto
  },
  scroll: {
    alignItems: 'center',
  },
});
