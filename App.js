import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Main from './src/navigators/Main'

function Load() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        paddingVertical: 100,
        paddingHorizontal: 30,
        backgroundColor: "#FDF6AA",
      }}
    >
      <Text
        style={{
          fontSize: 24,
        }}
      >
        Loading...
      </Text>
    </View>
  )
}

export default function App() {
  const [load, setLoad] = useState(true)
  const [au, setAu] = useState(false)
  const [id, setId] = useState()
  const [login, setLogin] = useState()
  const [user, setUser] = useState({
    au:false
  })
  

  function setFolseLoad() {
    setTimeout(() => {
      setLoad(false)
    }, 1000);
  }

  async function getUserData() {
    setAu(Boolean(await AsyncStorage.getItem('autorized')))
    setId(await AsyncStorage.getItem('id'))
    setLogin(await AsyncStorage.getItem('login'))
  }

  useEffect(() => {
    getUserData()
    setUser({au,id,login})
    setFolseLoad()
  },[login])
  return (
    load
      ?
      <Load />
      :
      <Main user={user}/>
  );
}
