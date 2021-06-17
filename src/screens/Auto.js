import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auto({ navigation }) {

  const [autorized, setAutorized] = useState(false)
  const [login, setLogin] = useState('')
  const [id, setId] = useState()
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function storeUserData(id) {
    try {
      await AsyncStorage.setItem('autorized', '1')
      await AsyncStorage.setItem('id', id)
      await AsyncStorage.setItem('login', login)
    }
    catch (error) {
      alert(error)
    }
  }

  async function signIn() {
    const res = await fetch(`http://192.168.1.51:3000/auto?login='${login}'&password=${password}`)
    const autoStatus = await res.json()
    setAutorized(autoStatus.status)
    setId(autoStatus.id)
    if (autoStatus.status) {
      storeUserData(String(autoStatus.id))
      navigation.navigate('Home', { autorized: autoStatus.status, id: autoStatus.id, login })
      ToastAndroid.show(`You has joined as ${login}!`, 2000)
    }
    else {
      ToastAndroid.show(`uncorrect!`, 2000)
      setErrorMessage('uncorect password or login')
      setPassword('')
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tochButton}
        onPress={() => { navigation.navigate('Register') }}
      >
        <Text
          style={styles.tochButtonTxt}
        >
          sign up
          </Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <View style={styles.formView}>
          <Text style={styles.text}>Autorization</Text>
          <TextInput
            style={styles.textInput}
            placeholder="login"
            value={login}
            onChangeText={setLogin}
            maxLength={20}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            maxLength={20}
            onEndEditing={() => { signIn }}
          />
        </View>
        <Text
          style={styles.errText}
        >
          {errorMessage}
        </Text>

        <View style={styles.buttonView}>

          <Button
            title='confirm'
            color='#2c2c2c'
            onPress={signIn}
            disabled={false}
          />
        </View>
      </View>

    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tochButton: {
    height: 30,
    backgroundColor: '#5555',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  tochButtonTxt: {
    color: '#000',
    fontSize: 20
  },
  form: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 50,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold'
  },
  textInput: {
    fontSize: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 200,
    marginBottom: 40
  },
  formView: {
    flex: 1,
    justifyContent: 'center',
  },
  errText: {
    color: 'red',
    fontSize: 18,
  },
  buttonView: {
    justifyContent: 'flex-end',
    flex: .2,
    width: 150,
    marginBottom: 40
  }
})