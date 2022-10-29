import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import StyleVariables from '../../../../../StyleVariables';
import ChatWrapper from '../../../../components/ChatBubble';
import ConversationAvatar from '../../../../components/ConversationAvatar';
import { IUserA } from '../../../../models/User';
import actions from '../../../../redux/messages/actions';
import * as ImagePicker from 'expo-image-picker';
import { LogBox } from 'react-native';
import getFileFromUri from '../../../../utils/getFileFromUri';
import moment from 'moment';

// ignore all warning
LogBox.ignoreAllLogs();

const Conversation = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { type, conversation, users } = route.params;
  const me = useSelector((state: any) => state.user.data);
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.messages.messages);
  const [image, setImage] = useState<any>(null);
  const [newMessage, setNewMessage] = React.useState<any>({
    content: '',
    type: 'text',
    fromUserId: me?._id,
    file: null,
  });
  const aref = useAnimatedRef<any>();
  const url = 'https://api.hieud.me';
  const socket = useMemo(() => {
    return io(url, {
      transports: ['websocket', 'polling', 'flashsocket'],
      query: { userId: me._id },
    });
  }, []);

  const handleAddMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      const file = await getFileFromUri(result.uri);
      setImage(result.uri);
      const message = {
        type: result.type,
        file: {
          uri: result.uri,
          type: file.type,
          name: moment.now() + '.' + file.type.split('/')[1],
        },
      }
      handleSendMessage(message)
    }
  };

  const handleOutsideKeyboardTouch = () => {
    Keyboard.dismiss();
  };

  const handleNewMessageChange = (text: string) => {
    setNewMessage({
      ...newMessage,
      content: text,
    });
  };

  const handleSendMessage = (message?: any) => {
    dispatch({
      type: actions.SEND_MESSAGE,
      payload: {
        conversationId: conversation._id,
        message: message ? message : newMessage,
        callback: onSendSuccess,
      },
    });
  };

  const onSendSuccess = () => {
    setNewMessage({
      ...newMessage,
      content: '',
    });
    setTimeout(() => {
      aref.current.scrollTo({
        y: 10000,
        animated: true,
      });
    }, 50);
  };

  useEffect(() => {
    dispatch({
      type: actions.SET_USERS,
      payload: {
        users,
      },
    });
    dispatch({
      type: actions.GET_MESSAGES,
      payload: {
        conversationId: conversation._id,
        callback: onSendSuccess,
      },
    });
    console.log(messages)
    navigation.setOptions({});
    socket.emit('join-room', conversation._id);
  }, []);

  useEffect(() => {
    socket.on('new-message', (data: any) => {
      console.log('socket new message', data);
      if (data && data.message) {
        dispatch({
          type: actions.UPDATE_MESSAGES,
          payload: {
            message: data.message,
            callback: () => {
              setTimeout(() => {
                aref.current.scrollTo({
                  y: 10000,
                  animated: true,
                });
              }, 50);
            },
          },
        });
      }
    });
    return () => {};
  }, [socket]);

  return (
    <TouchableWithoutFeedback onPress={handleOutsideKeyboardTouch}>
      <SafeAreaView
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <View
          style={{
            width: '100%',
            height: 80,
            borderBottomColor: '#c4c4c4',
            borderBottomWidth: 0.3,
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: actions.SET_STATE,
                  payload: {
                    messages: [],
                    loading: false,
                  },
                });
                navigation.goBack();
                socket.emit('leave-room', conversation._id);
                socket.disconnect();
              }}
              style={{ marginRight: 5 }}
            >
              <Ionicons
                name="chevron-back"
                size={35}
                color={StyleVariables.colors.gradientStart}
              />
            </TouchableOpacity>
            <ConversationAvatar
              type={type}
              urls={users.map((u: { avatarUrl: any }) => u.avatarUrl)}
              size={50}
            />
            <View
              style={{
                marginLeft: 10,
                height: 45,
              }}
            >
              <Text
                style={{
                  fontFamily: 'sf-pro-bold',
                  fontSize: 16,
                  marginBottom: 7,
                  maxWidth: 150,
                }}
              >
                {users.length === 2
                  ? users.find((user: IUserA) => user._id !== me._id)?.account
                      ?.username
                  : conversation.conversationName || 'No name'}
              </Text>
              <Text
                style={{
                  fontFamily: 'sf-pro-reg',
                  fontSize: 14,
                  color: StyleVariables.colors.gray200,
                }}
              >
                {Math.random() > 0.5
                  ? 'Online'
                  : `Online ${Math.floor(Math.random() * 60)} minutes ago`}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 80,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="call-outline"
                size={28}
                color={StyleVariables.colors.gradientStart}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="videocam-outline"
                size={35}
                color={StyleVariables.colors.gradientStart}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.ScrollView
          ref={aref}
          style={{
            flexGrow: 1,
          }}
        >
          {messages.map((message: any, index: number) => {
            const isPreviousMessageFromSameUser =
              messages[index - 1]?.fromUserId === message.fromUserId;
            const isNextMessageFromSameUser =
              messages[index + 1]?.fromUserId === message.fromUserId;
            return (
              <ChatWrapper
                key={message._id}
                message={message}
                sender={users.find(
                  (u: { _id: string }) => u._id === message.fromUserId
                )}
                me={me}
                type={type}
                isPreviousMessageFromSameUser={isPreviousMessageFromSameUser}
                isNextMessageFromSameUser={isNextMessageFromSameUser}
              />
            );
          })}
        </Animated.ScrollView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={20}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{}}
        >
          <View
            style={{
              maxWidth: '100%',
              height: 50,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopWidth: 0.3,
              borderTopColor: '#c4c4c4',
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={handleAddMedia}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                borderWidth: 0.3,
                borderColor: '#c4c4c4',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color={StyleVariables.colors.gradientStart}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                borderWidth: 0.3,
                borderColor: '#c4c4c4',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Ionicons
                name="happy-outline"
                size={24}
                color={StyleVariables.colors.gradientStart}
              />
            </TouchableOpacity>
            <View
              style={{
                maxWidth: '60%',
                flexGrow: 1,
                height: 40,
                borderRadius: 40,
                borderWidth: 0.3,
                borderColor: '#c4c4c4',
                justifyContent: 'center',
                paddingHorizontal: 15,
                marginRight: 10,
              }}
            >
              <TextInput
                onFocus={() => {
                  setTimeout(() => {
                    aref.current.scrollTo({
                      y: 10000,
                      animated: true,
                    });
                  }, 50);
                }}
                style={{ width: '100%' }}
                placeholder="Type a message"
                placeholderTextColor={StyleVariables.colors.gray200}
                value={newMessage.content}
                onChangeText={handleNewMessageChange}
              />
            </View>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                borderWidth: 0.3,
                borderColor: '#c4c4c4',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 5,
                paddingTop: 2,
              }}
              onPress={() => handleSendMessage()}
              disabled={newMessage?.content?.length === 0}
            >
              <Ionicons
                name="send-outline"
                size={24}
                color={StyleVariables.colors.gradientStart}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Conversation;
