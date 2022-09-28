import React from "react"
import { View, Text, ScrollView } from 'react-native'
import Chats from "./Chats"
import Story from "./Story"

const ChatTab = () => {
  return (
    <View style={{
      justifyContent: 'flex-start',
      flex: 1
    }}>
      <View>
        <Story />
      </View>
      <ScrollView alwaysBounceVertical={false} style={{
        flexGrow: 1,
      }}>
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
      </ScrollView>
    </View>
  )
}

export default ChatTab