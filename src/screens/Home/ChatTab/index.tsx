import React from "react"
import { View, ScrollView } from 'react-native'
import Chats from "./Chats"
import Story from "./Story"

const ChatTab = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{
      justifyContent: 'flex-start',
      flex: 1
    }}>
      <View>
        <Story />
      </View>
      <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false} style={{
        flexGrow: 1,
      }}>
        <Chats navigation={navigation} />
      </ScrollView>
    </View>
  )
}

export default ChatTab
