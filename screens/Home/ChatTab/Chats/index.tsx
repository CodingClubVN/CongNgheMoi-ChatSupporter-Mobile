import React from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import ConversationItem from "../../../../components/ConversationItem"

const Chats = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ width: '100%' }}>
      <ConversationItem
        navigation={navigation}
        type="direct"
        user={[{
          name: 'Jordan Moran',
          avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
        }]}
        conversation={{
          lastMessage: 'Hello',
          lastMessageTime: '12:00',
          readStatus: [
            {
              user: 'Jordan Moran',
              status: 'read'
            },
          ]
        }}
      />

      <ConversationItem
        navigation={navigation}
        type="group" user={[{
          name: 'Van A',
          avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
        },
        {
          name: 'Van B',
          avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
        }]}
        conversation={{
          lastMessage: 'Hello',
          lastMessageTime: '12:00',
          lastMessageSender: 'Van B',
          readStatus: [
            {
              user: 'Van A',
              status: 'unread'
            },
            {
              user: 'Van B',
              status: 'unread'
            },
          ]
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
})

export default Chats