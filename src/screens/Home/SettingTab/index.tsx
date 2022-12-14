import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import StyleVariables from '../../../../StyleVariables';
import { IUserA } from '../../../models/User';
import actions from '../../../redux/user/actions';

const mapStateToProps = (state: any) => ({
  user: state.user.data,
});

const SettingTab = ({ user, navigation }: { user: IUserA, navigation: any }) => {
  const dispatch = useDispatch();
  const defaultAvatar = require('../../../../assets/images/default_avatar.jpeg');

  const handleOnLogout = () => {
    dispatch({
      type: actions.LOGOUT,
      payload: {
        callback: () => {
          navigation.navigate('Login')
        }
      }
    })
  }

  const handleOnEditProfile = () => {
    navigation.navigate('Profile')
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        style={{
          width: '100%',
          height: 100,
          marginVertical: 10,
          backgroundColor: 'white',
          alignItems: 'center',
          paddingHorizontal: 15,
          flexDirection: 'row',
        }}
        onPress={handleOnEditProfile}
      >
        <Image
          defaultSource={defaultAvatar}
          source={{
            uri: user?.avatarUrl,
          }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 70,
          }}
        />
        <View style={{
          marginLeft: 20,
          height: 70,
          justifyContent: 'space-evenly',
        }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              fontFamily: 'sf-pro-bold',
              color: StyleVariables.colors.gray300
            }}
          >
            {user?.fullname || 'Username'}
          </Text>
          <Text style={{
            fontSize: 14,
            fontFamily: 'sf-pro-reg',
            color: StyleVariables.colors.gray200
          }}>
            View profile
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{
        width: '100%',
        height: 50,
        backgroundColor: StyleVariables.colors.gradientStart,
        alignItems: 'center',
        justifyContent: 'center',
      }} onPress={handleOnLogout}>
        <Text style={{
          fontSize: 18,
          fontFamily: 'sf-pro-bold',
          color: 'white'
        }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps)(SettingTab);
