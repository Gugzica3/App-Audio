// src/telas/TelaLogin.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const emailTrimmed = email.trim().toLowerCase();
    const senhaTrimmed = senha.trim();

    console.log('Email após trim e lowercase:', emailTrimmed);
    console.log('Senha após trim:', senhaTrimmed);

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
      console.log('Tentando fazer login com o email:', emailTrimmed);
      const usuariosJSON = await AsyncStorage.getItem('usuarios');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      console.log('Dados atuais de usuários:', usuarios);

      const usuario = usuarios.find(usuario => usuario.email === emailTrimmed);
      console.log('Usuário encontrado:', usuario);

      if (usuario) {
        if (usuario.senha === senhaTrimmed) {
          console.log('Login bem-sucedido para:', emailTrimmed);
          navigation.reset({
            index: 0,
            routes: [{ name: 'MenuPrincipal' }],
          });
        } else {
          Alert.alert('Erro', 'Senha incorreta!');
        }
      } else {
        Alert.alert('Erro', 'Usuário não encontrado!');
      }
    } catch (error) {
      console.log('Erro no login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.titulo}>Entretenimento Interativo</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#00FFFF"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#00FFFF"
          value={senha}
          onChangeText={text => setSenha(text)}
          secureTextEntry
          textContentType='password'
        />
        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaCadastro')}>
          <Text style={styles.cadastroTexto}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fundo preto
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
    color: '#00FFFF', // Neon Cyan
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    height: 50,
    borderColor: '#00FFFF', // Neon Cyan
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#1a1a1a', // Cinza muito escuro para contraste
    color: '#00FFFF', // Neon Cyan
    fontSize: 16,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  botao: {
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF00FF', // Neon Magenta
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF00FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  textoBotao: {
    fontSize: 18,
    color: '#FF00FF', // Neon Magenta
    fontWeight: 'bold',
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cadastroTexto: {
    marginTop: 15,
    color: '#1E90FF', // Neon Blue
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
    textShadowColor: '#1E90FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});
