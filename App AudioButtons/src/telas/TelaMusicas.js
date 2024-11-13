// src/telas/TelaMusicas.js

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BotaoAnimado from '../../components/BotaoAnimado';

export default function TelaMemes({ navigation }) {
  const memes = [
    { titulo: 'Conexões!', som: require('../../assets/sounds/musica.MP3') },
    { titulo: 'Chave do Smurf', som: require('../../assets/sounds/musica2.MP3') },
    { titulo: 'Caypyra lyfe', som: require('../../assets/sounds/musica3.MP3') },
    
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
