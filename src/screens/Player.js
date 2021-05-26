import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Video } from 'expo-av';

export default function Player({ route }) {
  const { userId, link, title, idVideo, history } = route.params
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    saveToHystory()
  }, [idVideo])

  async function saveToHystory() {
    if (userId>=0 && !history) {
      await fetch(`http://192.168.1.51:3000/toHistory?idUser=${userId}&idVideo=${idVideo}`)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: link,
        }}
        useNativeControls
        resizeMode='cover'
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 23,
    paddingLeft:20,
  },
  video: {
    flex: 1,
    
  },

})