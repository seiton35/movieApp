import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Image, View, Button, Text, TextInput, TouchableOpacity } from 'react-native'

export default function Feed({ navigation, route }) {
  const [id, setId] = useState(route.params.id)
  const [login, setLogin] = useState(route.params.login)
  const [search, setSearch] = useState(false)
  const [history, setHistory] = useState(route.params.history)
  console.log(id);
  const [videoName, setVideoName] = useState('')
  const [searchbtn, setSearchbtn] = useState(true)
  const [videoList, setVideoList] = useState([
    {
      id: 123,
      title: "server not responsing:/",
      link: 'https://v004.radikal.ru/2104/de/6247427436-5-7929355de49ea4595e644a06b6607c51.mp4',
      img: 'https://yt3.ggpht.com/a/AATXAJypGvGk1cqCCPamdgkuDWny84XJfF2e_OI_wteFlQ=s900-c-k-c0xffffffff-no-rj-mo'
    }
  ])

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
    // setId(route.params.id)
    // setHistory(route.params.hystory)
    if (history) {
      navigation.setOptions({ title: 'my history' })
    }
  })
  useEffect(() => {
    if (!search) {
      if (!history) {
        takeVideoList()
      }
      else {
        takeHistoryVideoList()
      }
    }
  }, [search])

  useEffect(() => {
    if (videoName.length > 0) {
      setSearchbtn(false)
    }
    else setSearchbtn(true)
  }, [videoName])

  async function takeVideoList() {
    const res = await fetch(`http://192.168.1.51:3000/allVideo`)
    const videoList = await res.json()
    setVideoList(videoList)
  }
  async function takeHistoryVideoList() {
    const res = await fetch(`http://192.168.1.51:3000/allHistoryVideo?idUser=${id}`)
    const videoList = await res.json()
    setVideoList(videoList)
  }

  async function searchVideoList() {
    const res = await fetch(`http://192.168.1.51:3000/videoFromName?videoName=${videoName}`)
    const videoList = await res.json()
    setSearch(true)
  }

  return (
    <View style={styles.container}>
      {
        !history
          ?
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={videoName}
              onChangeText={setVideoName}
              placeholder='search on movieApp'
            />
            <View style={styles.searchBtn}>
              <Button
                disabled={searchbtn}
                title="search"
                onPress={searchVideoList}
              />
            </View>
          </View>
          : null
      }
      <ScrollView style={styles.scrollArea}>
        {
          videoList.map((item, index) => {
            const { link, title, img } = item
            return (
              <TouchableOpacity
                onPress={() => { navigation.navigate('Player', { userId: id, link, title, idVideo: item.id, history }) }}
                key={index}
                style={styles.videoItem}>
                <Image
                  style={styles.videoPreView}
                  source={{ uri: img }}
                ></Image>
                <Text style={styles.videoItemTitle}>
                  {title}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  TouchableOpacity: {
    fontSize: 23
  },
  searchContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  searchInput: {
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  btnContainer: {
    marginBottom: 20,
    width: 150
  },
  scrollArea: {
    width: '95%',
    flex: 1,
  },
  videoItem: {
    paddingTop: 10
  },
  videoPreView: {
    height: 220,
    backgroundColor: '#2222',
    borderRadius: 20
  },
  videoItemTitle: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10
  },
})