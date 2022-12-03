import React, { useCallback, useState } from "react"
import { View, ScrollView, RefreshControl } from 'react-native'
import { useDispatch } from "react-redux"
import actions from "../../../redux/conversations/actions"
import Chats from "./Chats"
import Story from "./Story"

const ChatTab = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch({
      type: actions.GET_CONVERSATIONS,
      payload: {
        callback: () => {
          setRefreshing(false)
        }
      }
    })
  }, []);

  return (
    <View style={{
      justifyContent: 'flex-start',
      flex: 1
    }}>
      <View>
        <Story />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        alwaysBounceVertical={false} showsVerticalScrollIndicator={false} style={{
          flexGrow: 1,
        }}>
        <Chats navigation={navigation} />
      </ScrollView>
    </View>
  )
}

export default ChatTab
