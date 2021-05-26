import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignOut({ navigation }) {

  async function deleteUserData() {
    await AsyncStorage.setItem('login', '')
    await AsyncStorage.setItem('id', '')
    await AsyncStorage.setItem('autorized', '')

    navigation.navigate('Home', {
      autorized: false,
      id: undefined,
      login: undefined
    })
  }

  return (
    <View style={styles.form}>
      <View style={styles.formView}>
        <Text style={styles.text}>Sign out?</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonView}>
          <Button
            title='yes'
            color='#2c2c2c'
            onPress={deleteUserData}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title='no'
            color='#2c2c2c'
            onPress={() => { navigation.navigate('Home') }}
          />
        </View>
      </View>

    </View>)
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "black",
    fontSize: 20
  },
  formView: {
    flex: 1,
    justifyContent: 'center',

  },
  buttonView: {
    justifyContent: 'flex-end',
    width: 100,
    marginRight: 30,
    marginLeft: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 100,
  }
})