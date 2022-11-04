import { useEffect } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CUser from '../../../../components/CUser'
import CUserResult from '../../../../components/CUserResult'
import actions from '../../../../redux/friends/actions'

const RequestReceived = () => {
  const dispatch = useDispatch()
  const requests = useSelector((state: any) => state.friends.friendRequest)

  useEffect(() => {
    dispatch({
      type: actions.GET_FRIEND_REQUEST
    })
  }, [])

  return (
    <ScrollView style={{
      flex: 1,
    }}>
      {
        requests.map((item: any, index: number) => {
          item.fromUser.friendRequestStatus = 'pending'
          return (
            <CUserResult key={index} user={item.fromUser} />
          )
        })
      }
    </ScrollView>
  )
}

export default RequestReceived