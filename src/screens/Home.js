import React, { useEffect, useRef, useState } from 'react'
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native'

export default function Home({ navigation, route }) {
  const [autorized, setAutorized] = useState()
  const [id, setId] = useState()
  const [login, setLogin] = useState()


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={{
          fontSize: 17,
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 30,
          paddingLeft: 10
        }}>
          {login}
        </Text>)
    })
    setAutorized(route.params.autorized)
    setId(route.params.id)
    setLogin(route.params.login)
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { navigation.navigate("Feed", { id, login, history: false }) }}
        style={styles.toPageTouch}>
        <Text style={styles.toPageTxt}>
          news feed
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (autorized) {
            navigation.navigate("Feed", { id, login, history: true })
          } else {
            navigation.navigate("Auto")
          }
        }}
        style={styles.toPageTouch}>
        <Text style={styles.toPageTxt}>
          history
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          autorized
            ?
            navigation.navigate("SignOut")
            :
            navigation.navigate("Auto")
        }}
        style={styles.toPageTouch}>
        <Text style={styles.toPageTxt}>
          {
            autorized
              ?
              'quit'
              :
              'sign'
          }
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  toPageTouch: {
    alignItems: 'center',
    justifyContent: "center",
    width: '80%',
    height: '7%',
    marginTop: 30,
  },
  toPageTxt: {
    fontSize: 25
  }
})