import { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CUser from '../../../../components/CUser'
import actions from '../../../../redux/friends/actions'

const FriendTab = () => {
  const dispatch = useDispatch()
  const friend = useSelector((state: any) => state.friends.friends)

  useEffect(() => {
    dispatch({
      type: actions.GET_FRIENDS
    })
  }, [])

  return (
    <ScrollView style={{
      flex: 1,
    }}>
      {
        friend.map((item: any, index: number) => {
          return (
            <CUser key={index} user={item} />
          )
        })
      }
    </ScrollView>
  )
}

export default FriendTab