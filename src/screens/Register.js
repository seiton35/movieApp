import React, { useState } from 'react'
import { View, StyleSheet, Button, Text, TextInput, TouchableOpacity } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [login, setLogin] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errMess, seterrMess] = useState('')

  const storeUser = async (id) => {
    try {
      await AsyncStorage.setItem('id', String(id))
      await AsyncStorage.setItem('login', login)
      await AsyncStorage.setItem('autorized', String(true))
    }
    catch (error) {
      alert(error)
    }
  }

  async function Registration() {
    if (confirmPassword == password) {
      if (login != '' || mail != '' || password != '') {
        const res = await fetch(`http://192.168.1.51:3000/registration?login=${login}&mail=${mail}&password=${password}`)
        const {regStatus, id} = await res.json()
        if (regStatus){
          storeUser(id)
          navigation.navigate('Home',{ autorized: regStatus, id, login })
        }
        else{
          seterrMess('uncorrect data!')
        }
      }
    }
  }

  return (
    <View style={styles.container}>
            <TouchableOpacity
        style={styles.tochButton}
        onPress={() => { navigation.navigate('Auto') }}
      >
        <Text
          style={styles.tochButtonTxt}
        >
          sign in
          </Text>
      </TouchableOpacity>
    <View style={styles.form}>
      <View style={styles.formView}>
        <Text style={styles.text}>Registration on app</Text>
        <TextInput //login
          style={styles.textInput}
          placeholder='your login'
          value={login}
          maxLength={20}
          autoCompleteType='username'
          onChangeText={setLogin}
        />
        <TextInput //mail
          style={styles.textInput}
          placeholder='your mail'
          value={mail}
          autoCompleteType='email'
          onChangeText={setMail}
          keyboardType='email-address'
        />
        <TextInput //pass1
          style={styles.textInput}
          placeholder='password'
          value={password}
          autoCompleteType='password'
          onChangeText={setPassword}
          secureTextEntry={true}
          maxLength={20}
        />
        <TextInput //pass2
          style={styles.textInput}
          placeholder='confirm password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          maxLength={20}
        />
        <Text style={styles.errMess}>{errMess}</Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          title='confirm'
          color='#2c2c2c'
          onPress={Registration}
        />
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tochButton: {
    height:30,
    backgroundColor: '#5555',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  tochButtonTxt: {
    color: '#000',
    fontSize:20
  },
  form: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    marginBottom: 50,
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
  errMess:{
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