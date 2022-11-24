import { View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CUser from '../../../../components/CUser'
import { useEffect } from 'react'
import actions from '../../../../redux/friends/actions'

const ContactNative = () => {
  const dispatch = useDispatch()
  const friend = useSelector(state => state.friends.friends)

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
        friend.map((item, index) => {
          return (
            <CUser key={index} user={item.friend} />
          )
        })
      }
    </ScrollView>
  )
}

export default ContactNative