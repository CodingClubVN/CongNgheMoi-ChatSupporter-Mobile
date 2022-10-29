import React, { useEffect } from "react"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import ConversationItem from "../../../../components/ConversationItem"
import actions from "../../../../redux/conversations/actions"

const Chats = ({ navigation }: { navigation: any }) => {
  const conversations = useSelector((state: any) => state.conversations)
  const user = useSelector((state: any) => state.user.data)
  const url = 'https://api.hieud.me'
  const socket = io(url, { transports: ['websocket', 'polling', 'flashsocket'], query: { userId: user?._id } });
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('update-conversation', (data: any) => {
      dispatch({
        type: actions.SET_STATE,
        payload: {
          listData: [data.conversation, ...conversations]
        }
      })
    })
  }, [socket])

  return (
    <View style={{ width: '100%' }}>
      {
        conversations.listData?.map((conversation: any) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
            navigation={navigation}
            type={conversation.users.length > 2 ? 'group' : 'direct'}
            users={conversation.users}
            me={user}
          />
        ))
      }
    </View>
  )
}

export default Chats
