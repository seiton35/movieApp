import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native'
import { Video } from 'expo-av';

export default function Player({ route }) {
  const { userId, link, title, idVideo, history } = route.params
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [comment, setComment] = useState('');

  useEffect(() => {
    saveToHystory()
  }, [idVideo])

  async function saveToHystory() {
    if (userId >= 0 && !history) {
      await fetch(`http://192.168.1.51:3000/toHistory?userId=${userId}&idVideo=${idVideo}`)
    }
  }

  async function leaveComment() {
    if (userId >= 0) {
      const comReg = /\w/
      if (comment.match(comReg)) {
        await fetch(`http://192.168.1.51:3000/sendComment?userId=${userId}&idVideo=${idVideo}&comment=${comment}`)
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: link,
          }}
          useNativeControls
          resizeMode='contain'
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.hiCommentContainer}>
          {
            userId >= 0
              ?
              <TextInput
                style={styles.commentInput}
                // multiline
                placeholder="leave a comment"
                value={comment}
                onChangeText={setComment}
                onSubmitEditing={leaveComment}
              />
              :
              <Text style={styles.commentInput}>
                to leave comments, enter your profile
              </Text>
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 23,
    paddingLeft: 20,
  },
  video: {
    height: 400,
  },
  CommentContainer: {
    height: 600,
    width: '100%',
    paddingLeft: 10,
    backgroundColor: 'brown'
  },
  commentInput: {
    width: 375,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: 'green',
    fontSize: 20,
  }

})