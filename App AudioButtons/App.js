 // App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaLogin from './src/telas/TelaLogin';
import TelaCadastro from './src/telas/TelaCadastro';
import MenuPrincipal from './src/telas/MenuPrincipal';
import TelaMemes from './src/telas/TelaMemes';
import TelaAnimes from './src/telas/TelaAnimes';
import TelaMusicas from './src/telas/TelaMusicas';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TelaLogin"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000', // Fundo do cabeçalho preto
          },
          headerTintColor: '#00FFFF', // Cor do texto no cabeçalho neon cyan
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="TelaLogin" 
          component={TelaLogin} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TelaCadastro" 
          component={TelaCadastro} 
          options={{ title: 'Cadastro' }} 
        />
        <Stack.Screen 
          name="MenuPrincipal" 
          component={MenuPrincipal} 
          options={{ title: 'Menu Principal', headerLeft: null, gestureEnabled: false }} 
        />
        <Stack.Screen 
          name="TelaMemes" 
          component={TelaMemes} 
          options={{ title: 'Memes' }} 
        />
        <Stack.Screen 
          name="TelaAnimes" 
          component={TelaAnimes} 
          options={{ title: 'Animes' }} 
        />
        <Stack.Screen 
          name="TelaMusicas" 
          component={TelaMusicas} 
          options={{ title: 'Músicas' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
