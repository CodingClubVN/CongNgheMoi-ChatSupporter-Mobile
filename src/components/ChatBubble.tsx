import { IMessage } from '../models/Message';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { IUserA } from '../models/User';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import { forwardRef, useEffect, useState } from 'react';
import StyleVariables from '../../StyleVariables';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { downloadFile, downloadFileAsync } from '../utils/fs';
import sharingWithExpoUri from '../utils/sharing';
import { useDispatch } from 'react-redux';
import actions from '../redux/messages/actions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const ChatBubble = forwardRef(
  (
    {
      type,
      message,
      sender,
      me,
      isPreviousMessageFromSameUser,
      isNextMessageFromSameUser,
      callback,
      isLastMessage,
    }: {
      type: string;
      message: IMessage;
      sender: any;
      me: IUserA;
      isPreviousMessageFromSameUser: boolean;
      isNextMessageFromSameUser: boolean;
      callback: Function;
      isLastMessage: boolean;
    },
    ref: any
  ) => {
    const dispatch = useDispatch();
    const fromMe = message.fromUserId === me?._id;
    const [mediaSize, setMediaSize] = useState({ width: 0, height: 0 });

    const handleDonwload = async (uri: string) => {
      const download = await downloadFile(encodeURI(uri));
      const res = await downloadFileAsync(download);
      await sharingWithExpoUri(res);
    };

    const getImageSize = async (uri: string) => {
      return new Promise<{ width: number; height: number }>((resolve) => {
        Image.getSize(
          uri,
          (width, height) => {
            console.log({ width, height });

            resolve({ width, height });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    };

    useEffect(() => {
      if (message.type === 'image' || message.type === 'video') {
        getImageSize(message.content[0])
          .then((size) => {
            const newSize = {
              width: 200,
              height: (size.height * 200) / size.width,
            };
            setMediaSize(newSize);
            if (isLastMessage) {
              callback();
            }
          })
          .catch((error) => {
            setTimeout(() => {
              getImageSize(message.content[0]).then((size) => {
                const newSize = {
                  width: 200,
                  height: (size.height * 200) / size.width,
                };
                setMediaSize(newSize);
                if (isLastMessage) {
                  callback();
                }
              });
            }, 1000);
          });
      }
    }, [message.content]);

    useEffect(() => {
      setTimeout(() => {
        callback && callback();
      }, 3000);
    }, []);

    return (
      <View
        style={{
          maxWidth: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        ref={ref}
      >
        {fromMe ? (
          message.type === 'text' && message.status !== "recovered" && message.status !== "answer" ? (
            <LinearGradient
              start={[1, -1]}
              end={[-1, 1]}
              // locations={[0.6, 0.7]}
              colors={[
                StyleVariables.colors.gradientStart,
                StyleVariables.colors.gradientEnd,
              ]}
              style={{
                height: 45,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: StyleVariables.colors.gradientEnd,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'sf-pro-reg',
                }}
              >
                {message.content[0]}
              </Text>
            </LinearGradient>
          ) : message.type === 'image' && message.status !== "recovered" && message.status !== "answer" ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: 200,
                flexWrap: 'wrap',
              }}
            >
              {message.content.length > 1 ? (
                (message.content as any[]).map((item: any) => (
                  <Image
                    key={item}
                    source={{ uri: encodeURI(item) }}
                    style={{
                      width: 100,
                      height: 100,
                      flexGrow: 1,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      // backgroundColor: StyleVariables.colors.gradientEnd,
                      borderTopLeftRadius: 25,
                      borderTopRightRadius: 25,
                      borderBottomLeftRadius: 25,
                      borderBottomRightRadius: 10,
                    }}
                  />
                ))
              ) : (
                <Image
                  key={message.createdAt}
                  source={{ uri: encodeURI(message.content[0]) }}
                  style={{
                    ...mediaSize,
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    // backgroundColor: StyleVariables.colors.gradientEnd,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 10,
                  }}
                />
              )}
            </View>
          ) : message.type === 'video' && message.status !== "recovered" && message.status !== "answer" ? (
            <View
              style={{
                height: 120,
                width: 200,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: StyleVariables.colors.gradientEnd,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 10,
              }}
            >
              {
                <Video
                  style={{
                    width: 200,
                    height: 120,
                    alignItems: 'center',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 10,
                  }}
                  resizeMode={ResizeMode.CONTAIN}
                  useNativeControls
                  source={{ uri: encodeURI(message.content[0]) }}
                />
              }
            </View>
          ) : message.type === 'file' && message.status !== "recovered" && message.status !== "answer" ? (
            <TouchableOpacity
              onPress={() => handleDonwload(message.content[0])}
              style={{
                height: 70,
                width: 200,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: StyleVariables.colors.gradientEnd,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 10,
                flexDirection: 'row',
              }}
            >
              <Ionicons name="file-tray" size={24} color="white" />
              <Text
                style={{
                  color: '#fff',
                  marginHorizontal: 10,
                  width: 120,
                }}
              >
                {message.content[0].split('?')[0].split('/').pop()}
              </Text>
            </TouchableOpacity>
          ) : message.type === 'notification' ? (
            <View
              style={{
                width: 375,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                zIndex: 1000
              }}
            >
              <Text
                style={{
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg',
                  fontSize: 12,
                }}
              >
                {message.content[0]}
              </Text>
            </View>
          ) : message.status === "answer" ? (
            <View style={{
              position: 'relative',
              height: 80
            }}>
              <LinearGradient
                start={[1, -1]}
                end={[-1, 1]}
                // locations={[0.6, 0.7]}
                colors={[
                  StyleVariables.colors.gray200,
                  StyleVariables.colors.gray300,
                ]}
                style={{
                  width: 80,
                  height: 45,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: StyleVariables.colors.gradientEnd,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderBottomLeftRadius: 25,
                  borderBottomRightRadius: 10,
                  alignSelf: 'flex-end'
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'sf-pro-reg',
                  }}
                >
                  Hello
                </Text>
              </LinearGradient>
              <LinearGradient
                start={[1, -1]}
                end={[-1, 1]}
                // locations={[0.6, 0.7]}
                colors={[
                  StyleVariables.colors.gradientEnd,
                  StyleVariables.colors.gradientStart,
                ]}
                style={{
                  height: 45,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: StyleVariables.colors.gradientEnd,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderBottomLeftRadius: 25,
                  borderBottomRightRadius: 10,
                  zIndex: 100,
                  position: 'absolute',
                  top: 30,
                  width: 150,
                  right: 0
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'sf-pro-reg',
                  }}
                >
                  {message.content[0]}
                </Text>
              </LinearGradient>
            </View>
          ) : message.status === "recovered" ? (
            <LinearGradient
              start={[1, -1]}
              end={[-1, 1]}
              // locations={[0.6, 0.7]}
              colors={[
                StyleVariables.colors.gray100,
                StyleVariables.colors.gray200,
              ]}
              style={{
                height: 45,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: StyleVariables.colors.gradientEnd,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 10,
              }}
            >
              <Text
                style={{
                  color: StyleVariables.colors.gray300,
                  fontSize: 16,
                  fontFamily: 'sf-pro-reg',
                }}
              >
                Unsent message
              </Text>
            </LinearGradient>
          ) : null
        ) : (
          <>
            {type === 'group' &&
              !isNextMessageFromSameUser &&
              message.type !== 'notification' && (
                <Image
                  key={message.createdAt}
                  source={{ uri: sender.avatarUrl }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    marginRight: 10,
                  }}
                />
              )}
            {message.type === 'text' && message.status !== "recovered" ? (
              <View
                style={{
                  height: 45,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: StyleVariables.colors.gray200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 25,
                  marginLeft:
                    isNextMessageFromSameUser && type === 'group' ? 40 : 0,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'sf-pro-reg',
                  }}
                >
                  {message.content}
                </Text>
              </View>
            ) : message.type === 'image' && message.status !== "recovered" ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  width: 200,
                  marginLeft:
                    isNextMessageFromSameUser && type === 'group' ? 40 : 0,
                }}
              >
                {message.content.length > 1 ? (
                  (message.content as any[]).map((item: any) => (
                    <Image
                      key={item}
                      source={{ uri: encodeURI(item) }}
                      style={{
                        width: 100,
                        height: 100,
                        flexGrow: 1,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        // backgroundColor: StyleVariables.colors.gradientEnd,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 10,
                      }}
                    />
                  ))
                ) : (
                  <Image
                    source={{ uri: encodeURI(message.content[0]) }}
                    style={{
                      ...mediaSize,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      backgroundColor: StyleVariables.colors.gray200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopLeftRadius: 25,
                      borderTopRightRadius: 25,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 25,
                      // marginLeft:
                      // isNextMessageFromSameUser && type === 'group' ? 40 : 0,
                    }}
                  />
                )}
              </View>
            ) : message.type === 'video' && message.status !== "recovered" ? (
              <View
                style={{
                  height: 120,
                  width: 200,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: StyleVariables.colors.gray200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 25,
                  marginLeft:
                    isNextMessageFromSameUser && type === 'group' ? 40 : 0,
                }}
              >
                {
                  <Video
                    style={{
                      width: 200,
                      height: 120,
                      alignItems: 'center',
                      borderTopLeftRadius: 25,
                      borderTopRightRadius: 25,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 25,
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    isLooping
                    source={{ uri: encodeURI(message.content[0]) }}
                  />
                }
              </View>
            ) : message.type === 'file' && message.status === 'normal' ? (
              <TouchableOpacity
                onPress={() => handleDonwload(message.content[0])}
                style={{
                  height: 70,
                  width: 200,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: StyleVariables.colors.gray200,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 25,
                  marginLeft:
                    isNextMessageFromSameUser && type === 'group' ? 40 : 0,
                  flexDirection: 'row',
                }}
              >
                <Ionicons name="file-tray" size={24} color="white" />
                <Text
                  style={{
                    color: '#fff',
                    marginHorizontal: 10,
                    width: 120,
                  }}
                >
                  {message.content[0].split('?')[0].split('/').pop()}
                </Text>
              </TouchableOpacity>
            ) : message.type === 'notification' ? (
              <View
                style={{
                  width: 375,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                }}
              >
                <Text
                  style={{
                    color: StyleVariables.colors.gray200,
                    fontFamily: 'sf-pro-reg',
                    fontSize: 12,
                  }}
                >
                  {message.content[0]}
                </Text>
              </View>
            ) : message.status === "answer" ? (
              <View style={{
                position: 'relative',
                height: 80
              }}>
                <LinearGradient
                  start={[1, -1]}
                  end={[-1, 1]}
                  // locations={[0.6, 0.7]}
                  colors={[
                    StyleVariables.colors.gray200,
                    StyleVariables.colors.gray300,
                  ]}
                  style={{
                    width: 80,
                    height: 45,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: StyleVariables.colors.gradientEnd,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 10,
                    alignSelf: 'flex-end'
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: 'sf-pro-reg',
                    }}
                  >
                    Hello
                  </Text>
                </LinearGradient>
                <LinearGradient
                  start={[1, -1]}
                  end={[-1, 1]}
                  // locations={[0.6, 0.7]}
                  colors={[
                    StyleVariables.colors.gradientEnd,
                    StyleVariables.colors.gradientStart,
                  ]}
                  style={{
                    height: 45,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: StyleVariables.colors.gradientEnd,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 10,
                    zIndex: 100,
                    position: 'absolute',
                    top: 30,
                    width: 150,
                    right: 0
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: 'sf-pro-reg',
                    }}
                  >
                    {message.content[0]}
                  </Text>
                </LinearGradient>
              </View>
            ) : message.status === "recovered" ? (
              <LinearGradient
                start={[1, -1]}
                end={[-1, 1]}
                // locations={[0.6, 0.7]}
                colors={[
                  StyleVariables.colors.gray100,
                  StyleVariables.colors.gray200,
                ]}
                style={{
                  height: 45,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: StyleVariables.colors.gradientEnd,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderBottomLeftRadius: 25,
                  borderBottomRightRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: StyleVariables.colors.gray300,
                    fontSize: 16,
                    fontFamily: 'sf-pro-reg',
                  }}
                >
                  Unsent message
                </Text>
              </LinearGradient>
            ) : null}
          </>
        )}
      </View>
    );
  }
);

const ChatBubbleAnimated = Animated.createAnimatedComponent(ChatBubble);

const ChatWrapper = ({
  type,
  message,
  sender,
  me,
  isPreviousMessageFromSameUser,
  isNextMessageFromSameUser,
  callback,
  isLastMessage,
}: {
  type: string;
  message: IMessage;
  sender: any;
  me: IUserA;
  isPreviousMessageFromSameUser: boolean;
  isNextMessageFromSameUser: boolean;
  callback: Function;
  isLastMessage: boolean;
}) => {
  const dispatch = useDispatch()
  const fromMe = message.fromUserId === me?._id;
  const recoverMessage = () => {
    dispatch({
      type: actions.RECOVER_MESSAGE,
      payload: {
        messageId: message._id,
      },
    });
  };

  const forwardMessage = () => {
    dispatch({
      type: actions.FORWARD_MESSAGE,
      payload: {
        messageId: message._id,
        conversationId: message.conversationId,
      },
    });
  };
  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 2.5,
        alignItems: fromMe ? 'flex-end' : 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 15,
        flexDirection: 'column',
      }}
    >
      <ChatBubbleAnimated
        entering={fromMe ? BounceInRight : BounceInLeft}
        callback={callback}
        type={type}
        message={message}
        sender={sender}
        me={me}
        isPreviousMessageFromSameUser={isPreviousMessageFromSameUser}
        isNextMessageFromSameUser={isNextMessageFromSameUser}
        isLastMessage={isLastMessage}
      />
    </View>
  );
};

export default ChatWrapper;
