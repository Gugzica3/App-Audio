// src/telas/TelaCadastro.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaCadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    const emailTrimmed = email.trim().toLowerCase();
    const senhaTrimmed = senha.trim();

    if (emailTrimmed === '' || senhaTrimmed === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Validação simples de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(emailTrimmed)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    try {
      console.log('Tentando cadastrar usuário:', emailTrimmed);
      const usuariosJSON = await AsyncStorage.getItem('usuarios');
      let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      const usuarioExistente = usuarios.find(usuario => usuario.email === emailTrimmed);
      console.log('Usuário existente:', usuarioExistente);
      if (usuarioExistente) {
        Alert.alert('Erro', 'Usuário já cadastrado!');
        return;
      }

      const novoUsuario = { email: emailTrimmed, senha: senhaTrimmed };
      usuarios.push(novoUsuario);
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.log('Usuário cadastrado com sucesso:', novoUsuario);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('TelaLogin') },
      ]);
    } catch (error) {
      console.log('Erro no cadastro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.titulo}>Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={text => setSenha(text)}
          secureTextEntry
          textContentType='password'
        />
        <Button title="Cadastrar" onPress={handleCadastro} color="#0066cc" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#003366',
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});
