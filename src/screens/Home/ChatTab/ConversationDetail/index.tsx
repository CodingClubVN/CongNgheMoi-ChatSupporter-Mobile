import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyleVariables from '../../../../../StyleVariables';
import HideKeyboard from '../../../../components/HideKeyboard';
import CSelect, { SelectItem } from '../../../../components/CSelect';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/users/actions';
import conversationActions from '../../../../redux/conversations/actions';
import CUserResult from '../../../../components/CUserResult';

const ConversationDetail = ({
  modalVisible,
  setModalVisible,
  conversation
}: {
  modalVisible: boolean;
  setModalVisible: any;
  conversation: any
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.data);
  const user = useSelector((state: any) => state.user.data);
  const [selected, setSelected] = useState<SelectItem[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [data, setData] = useState<SelectItem[]>([]);
  const existingUsers = useMemo(() => {
    return conversation.users.map((user: any) => user.account.username)
  }, [conversation.users])

  const handleAddUser = () => {
    const users = selected.map((item) => item.value);
    dispatch({
      type: conversationActions.ADD_USER_CONVERSATION,
      payload: {
        conversationId: conversation._id,
        users
      }
    })
    dispatch({
      type: actions.SET_STATE,
      payload: {
        data: []
      }
    })
  }

  const handleRemoveUser = (userId: string) => {
    dispatch({
      type: conversationActions.REMOVE_USER_CONVERSATION,
      payload: {
        conversationId: conversation._id,
        userId
      }
    })
  }

  const usersToSelection = (users: any) => {
    if (users && users.length) {
      return users.map((user: any) => ({
        label: user.account.username,
        value: user._id,
        imgUrl: user.avatarUrl,
      })).filter((u: any) => u.value !== user._id)
    }
    return []
  }

  useEffect(() => {
    if (searchInput.length > 0) {
      dispatch({
        type: actions.GET_USERS,
        payload: {
          search: searchInput,
        }
      })
    }
  }, [searchInput])

  useEffect(() => {
    console.log('users', users)
    setData(usersToSelection(users))
  }, [users])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <HideKeyboard>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Ionicons
                name="close-circle"
                size={34}
                color={StyleVariables.colors.gradientStart}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'sf-pro-bold',
                marginBottom: 20,
                textAlign: 'left',
                color: StyleVariables.colors.gray300,
                width: 300
              }}
            >
              {conversation.conversationName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              {/* TODO: select */}
              <View
                style={{
                  width: '85%',
                }}
              >
                <CSelect
                  data={data}
                  value={selected}
                  onChange={setSelected}
                  inputProps={{
                    placeholder: 'Search users ...',
                    value: searchInput,
                    onChangeText: setSearchInput,
                  }}
                />
              </View>
              <TouchableOpacity
                disabled={selected.length === 0}
                onPress={() => {
                  handleAddUser();
                }}
              >
                <Ionicons
                  name="arrow-forward-circle"
                  size={50}
                  color={StyleVariables.colors.gradientStart}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={{
              flex: 1
            }}>
              {
                conversation?.users.map((item: any, index: number) => {
                  item.friendRequestStatus = 'request sent'
                  return (
                    <CUserResult callback={() => {
                      handleRemoveUser(item._id)
                    }} key={index} user={item} />
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
      </HideKeyboard>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    elevation: 5,
    height: '65%',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ConversationDetail;
