import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,

} from 'react-native'
import StyleVariables from '../../../../../StyleVariables'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CButton from '../../../../components/CButton';
import actions from '../../../../redux/user/actions';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const EditProfile = () => {
  const navigation = useNavigation()
  const me = useSelector((state: any) => state.user.data)
  const dispatch = useDispatch()
  const [image, setImage] = useState<any>(null)
  const [updatedUser, setUpdatedUser] = useState<any>({
    fullname: me.fullname,
    avatar: null,
    phone: me.phone,
    about: me.about || '',
    yearOfBirth: me.yearOrBirth || 2000,
  })
  const handleAddMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false
    });
    if (!result.cancelled) {
      const image = {
        uri: result.uri,
        name: `${new Date().getTime()}.jpg`,
        type: `${result.type}/${result.uri.split('.').pop()}`,
      }
      setImage(result.uri);
      setUpdatedUser((prev: any) => ({
        ...prev,
        avatar: image
      }))
    } else {
      setImage(null)
      setUpdatedUser((prev: any) => ({
        ...prev,
        avatar: null
      }))
    }
  };
  return (
    <View style={{
      flex: 1,
      padding: 20
    }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView keyboardVerticalOffset={20} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
          width: '100%',
          height: '100%'
        }}>
          <Text style={{
            fontFamily: 'sf-pro-bold',
            fontSize: 20,
            color: StyleVariables.colors.gray300
          }}>EditProfile</Text>
          <View style={{
            padding: 15,
            borderRadius: 20,
            backgroundColor: 'white',
            marginTop: 20
          }}>
            <TouchableOpacity
              onPress={handleAddMedia}
              style={{
                width: 150,
                height: 150,
                borderRadius: 150,
                backgroundColor: StyleVariables.colors.gray100,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
              }}>
              <ImageBackground imageStyle={{
                width: 150,
                height: 150,
                borderRadius: 150
              }}
                source={{ uri: image || me?.avatarUrl }} style={{
                  width: 150,
                  height: 150,
                  borderRadius: 150,
                  backgroundColor: StyleVariables.colors.gray100,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                }}>
                <Ionicons name="camera-outline" size={40} color={StyleVariables.colors.gray200} />
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{
            padding: 15,
            borderRadius: 20,
            backgroundColor: 'white',
            marginTop: 20
          }}>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              paddingHorizontal: 15,
              borderWidth: 0.3,
              borderRadius: 15,
              marginTop: 10
            }}>
              <Ionicons name="at" size={24} color="black" />
              <TextInput editable={false} placeholder='Username' style={{
                marginLeft: 10,
                fontFamily: 'sf-pro-med',
                fontSize: 18,
                width: 300,
                color: StyleVariables.colors.gray200
              }}
                value={me.account.username}
              />
            </View>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              paddingHorizontal: 15,
              borderWidth: 0.3,
              borderRadius: 15,
              marginTop: 10
            }}>
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput placeholder='Fullname' style={{
                marginLeft: 10,
                fontFamily: 'sf-pro-med',
                fontSize: 18,
                width: 300
              }}
                value={updatedUser.fullname}
                onChangeText={(text) => setUpdatedUser({ ...updatedUser, fullname: text })}
              />
            </View>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              paddingHorizontal: 15,
              borderWidth: 0.3,
              borderRadius: 15,
              marginTop: 10
            }}>
              <Ionicons name="call-outline" size={24} color="black" />
              <TextInput keyboardType='phone-pad' placeholder='Phone' style={{
                marginLeft: 10,
                fontFamily: 'sf-pro-med',
                fontSize: 18,
                width: 300
              }}
                value={updatedUser.phone}
                onChangeText={(text) => setUpdatedUser({ ...updatedUser, phone: text })}
              />
            </View>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              paddingHorizontal: 15,
              borderWidth: 0.3,
              borderRadius: 15,
              marginTop: 10
            }}>
              <Ionicons name="mail-outline" size={24} color="black" />
              <TextInput editable={false} placeholder='Email' style={{
                marginLeft: 10,
                fontFamily: 'sf-pro-med',
                fontSize: 18,
                width: 300,
                color: StyleVariables.colors.gray200
              }}
                value={me.email}
              />
            </View>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              paddingHorizontal: 15,
              borderWidth: 0.3,
              borderRadius: 15,
              marginTop: 10
            }}>
              <Ionicons name="calendar-outline" size={24} color="black" />
              <TextInput keyboardType='numeric' placeholder='Year of birth' style={{
                marginLeft: 10,
                fontFamily: 'sf-pro-med',
                fontSize: 18,
                width: 300
              }}
                value={updatedUser.yearOfBirth.toString()}
                onChangeText={(text) => setUpdatedUser({ ...updatedUser, yearOfBirth: parseInt(text) })}
              />
            </View>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              height: 80,
              padding: 15,
              borderWidth: 0.3,
              borderRadius: 15,
              marginTop: 10,
              alignItems: 'flex-start'
            }}>
              <Ionicons name="information-circle-outline" size={24} color="black" />
              <TextInput multiline placeholder='About' style={{
                marginLeft: 10,
                fontFamily: 'sf-pro-med',
                fontSize: 18,
                width: 280,
              }}
                value={updatedUser.about}
                onChangeText={(text) => setUpdatedUser({ ...updatedUser, about: text })}
              />
            </View>
          </View>
          <CButton title="Update" btnProps={{
            style: {
              marginTop: 20,
              width: '100%',
            },
            onPress: () => {
              dispatch({
                type: actions.UPDATE_PROFILE,
                payload: {
                  data: updatedUser,
                  id: me?._id,
                  callback: () => {
                    navigation.goBack()

                  }
                }
              })
            }
          }}>
            <Ionicons name="checkmark-outline" size={24} color="white" />
          </CButton>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

export default EditProfile