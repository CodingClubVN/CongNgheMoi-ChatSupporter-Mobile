import { View, Text, Image, ImageBackground, ScrollView, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import StyleVariables from '../../../../../StyleVariables';
import moment from 'moment';
import CButton from '../../../../components/CButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import actions from '../../../../redux/user/actions';

const Profile = ({ mode = 'me' }: any) => {
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const me = useSelector((state: any) => state.user.data)
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch({
      type: actions.GET_CURRENT_USER,
      payload: {
        callback: () => {
          setRefreshing(false)
        }
      }
    })
  }, []);
  const userObj = { user: me }
  const { user }: any = route.params || userObj
  const userProfile = user || useSelector((state: any) => state.user.data)
  return (
    <View style={{
      flex: 1,
      padding: 15,
    }}>
      <ScrollView showsVerticalScrollIndicator={false} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <ImageBackground source={{
          uri: 'https://images.template.net/wp-content/uploads/2014/11/Natural-Facebook-Cover-Photo.jpg'
        }}
          imageStyle={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            height: 150,
            position: 'relative',
            width: '100%'
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.75,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Image source={{ uri: encodeURI(userProfile.avatarUrl) }} style={{
            width: 150,
            height: 150,
            borderRadius: 150,
            position: 'absolute',
            bottom: -50,
          }} />
        </ImageBackground>
        <View style={{
          marginTop: 70,
          width: '100%',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'sf-pro-bold',
          }}>{userProfile.fullname}</Text>
          <Text style={{
            fontFamily: 'sf-pro-reg',
            fontSize: 14,
            color: StyleVariables.colors.gray300
          }}>@{userProfile.account?.username}</Text>
        </View>
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {
            mode === 'me' ? (
              <CButton title='Edit profile' btnProps={{
                onPress: () => {
                  navigation.navigate('EditProfile')
                },
              }}>
                <Ionicons style={{ marginRight: 10 }} name="md-create" size={24} color="white" />
              </CButton>
            ) : (
              <CButton title='Add' btnProps={undefined} />
            )

          }
        </View>
        <View style={{
          marginTop: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          paddingHorizontal: 30
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
            <Ionicons name="mail-outline" size={24} color="black" />
            <Text style={{
              marginLeft: 20,
              fontFamily: 'sf-pro-reg',
              fontSize: 14,
              color: StyleVariables.colors.gray300
            }}>
              {userProfile.email}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
            <Ionicons name="call-outline" size={24} color="black" />
            <Text style={{
              marginLeft: 20,
              fontFamily: 'sf-pro-reg',
              fontSize: 14,
              color: StyleVariables.colors.gray300
            }}>
              {userProfile.phone}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Ionicons name="create-outline" size={24} color="black" />
            <Text style={{
              marginLeft: 20,
              fontFamily: 'sf-pro-reg',
              fontSize: 14,
              color: StyleVariables.colors.gray300
            }}>
              {moment(userProfile.createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15
          }}>
            <Ionicons name="calendar-outline" size={24} color="black" />
            <Text style={{
              marginLeft: 20,
              fontFamily: 'sf-pro-reg',
              fontSize: 14,
              color: StyleVariables.colors.gray300
            }}>
              {userProfile?.yearOrBirth}
            </Text>
          </View>
        </View>
        <View style={{
          marginTop: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          paddingHorizontal: 30
        }}>
          <Ionicons name="information-circle" size={24} color="black" style={{
            alignSelf: 'center'
          }} />
          <Text style={{
            alignSelf: 'center',
            fontFamily: 'sf-pro-reg',
            fontSize: 18,
            color: StyleVariables.colors.gray300
          }}>
            {userProfile?.about}
          </Text>
        </View>
      </ScrollView>
    </View>
  )

}

export default Profile