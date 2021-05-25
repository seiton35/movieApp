import React, { useState } from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../screens/Home'
import Player from '../screens/Player'
import Auto from '../screens/Auto'
import Register from '../screens/Register'
import SignOut from '../screens/SignOut'
import Feed from '../screens/Feed';

export default function Main(props) {
  const [login, setLogin] = useState(props.user.login)
  const [autorized, setAutorized] = useState(props.user.au)
  const [id, setId] = useState(props.user.id)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e'
          }
        }}
      >
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'movieApp',
          }}
          initialParams={{
            autorized, id, login
          }}

        />
        <Stack.Screen options={{ title: '', }} name='Player' component={Player} />
        <Stack.Screen name='SignOut' component={SignOut} />
        <Stack.Screen options={{ title: 'sign in', }} name='Auto' component={Auto} />
        <Stack.Screen options={{ title: 'sign up', }} name='Register' component={Register} />
        <Stack.Screen name='Feed' component={Feed} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
