import React from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import ConversationItem from "../../../../components/ConversationItem"

const Chats = ({ navigation }: { navigation: any }) => {
  const conversations = useSelector((state: any) => state.conversations)
  console.log(conversations)
  return (
    <View style={{ width: '100%' }}>
      {
        conversations.listData?.map((conversation: any) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation} 
            navigation={navigation} 
            type={conversation.users.length > 2 ? 'group' : 'direct'} 
            user={conversation.users}
          />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
})

export default Chats