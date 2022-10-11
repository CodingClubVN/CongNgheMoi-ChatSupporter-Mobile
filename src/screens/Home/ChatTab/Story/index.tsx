import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import StyleVariables from '../../../../../StyleVariables'
import StoryItem from '../../../../components/StoryItem'
const Story = () => {
  const users = [
    {
      name: 'Van A',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },
    {
      name: 'Van B',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },
    {
      name: 'Van C',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },
    {
      name: 'Van k',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },
    {
      name: 'Van ;',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },
    {
      name: 'Van o',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },
    {
      name: 'Van l',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },
    {
      name: 'Van j',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },
    {
      name: 'Van e',
      avatar: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg'
    },

  ]
  return (
    <ScrollView 
      horizontal={true}
      alwaysBounceHorizontal={false}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{
        width: '100%',
        height: 140,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: StyleVariables.colors.white,
        borderBottomWidth: 0.3,
        borderBottomColor: StyleVariables.colors.gray200
      }}>
        <StoryItem isCreate={true} user={{ name: 'New status' }} callback={() => {}} />
        {
          users.map((user: any) => {
            return (
              <StoryItem isViewed={Math.random() > 0.5} key={user.name} user={user} callback={() => {}} />
            )
          })
        }
      </View>
    </ScrollView>
  )
}

export default Story