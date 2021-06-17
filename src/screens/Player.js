import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Player({ route }) {
  const { userId, link, title, idVideo, history } = route.params
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([])
  const [commentStatusChanged, setCommentStatusChanged] = useState(true)

  console.log(userId);

  useEffect(() => {
    saveToHystory()
  }, [idVideo])

  useEffect(() => {
    takeCommentList()
  }, [commentStatusChanged])

  async function takeCommentList() {
    const res = await fetch(`http://192.168.1.51:3000/getComments?&videoId=${idVideo}`)
    const commentList = await res.json()
    setCommentList(commentList)
  }

  async function saveToHystory() {
    if (userId >= 0 && !history) {
      await fetch(`http://192.168.1.51:3000/toHistory?userId=${userId}&idVideo=${idVideo}`)
    }
  }

  async function leaveComment() {
    if (userId >= 0) {
      const comReg = /\w/
      if (comment.match(comReg)) {
        const res = await fetch(`http://192.168.1.51:3000/sendComment?userId=${userId}&idVideo=${idVideo}&comment=${comment}`)
        if (res.status >= 200 && res.status < 300) {
          setComment('')
          setCommentStatusChanged(!commentStatusChanged)
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.leaveCommentContainer}>
          {
            userId >= 0
              ?
              < View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={styles.commentInput}
                  multiline
                  placeholder="leave a comment"
                  value={comment}
                  onChangeText={setComment}
                // onSubmitEditing={leaveComment}
                />
                <TouchableOpacity 
                style={styles.commentSubmitBtn}
                onPress={leaveComment}
                >
                  <MaterialCommunityIcons name="comment-arrow-right-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
              :
              <Text style={styles.commentInput}>
                to leave comments, enter your profile
              </Text>
          }
        </View>
        <View style={styles.commentList}>
          {
            commentList.map((item, index) => {
              const { datetime, id, id_user, id_video, text } = item
              return (
                <View style={styles.commentViewContaner} key={index}>
                  <Text style={styles.commentViewText}>{text}</Text>
                  {/* <Text style={styles.commentViewDatetime}>{datetime}</Text> */}
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 25,
    paddingLeft: 20,
  },
  video: {
    height: 220,
    width: '100%'
  },
  leaveCommentContainer: {
    width: '100%',
    paddingLeft: 10,
    backgroundColor: '#2222',
  },
  commentInput: {
    width: '90%',
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 20,
  },
  commentSubmitBtn:{
    paddingTop: 5,

  },
  commentList: {
    paddingLeft:15
  },
  commentViewContaner: {
    flexDirection: 'row',
  },
  commentViewText: {
    fontSize: 20
  },
  commentViewDatetime: {
    fontSize: 20
  }


})