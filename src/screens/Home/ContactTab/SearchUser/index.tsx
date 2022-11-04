import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Modal,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyleVariables from '../../../../../StyleVariables';
import HideKeyboard from '../../../../components/HideKeyboard';
import { useDispatch, useSelector } from 'react-redux';
import CInput from '../../../../components/CInput';
import actions from '../../../../redux/users/actions';
import CUserResult from '../../../../components/CUserResult';

const SearchUserModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: any;
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.data);
  const [searchInput, setSearchInput] = React.useState('');

  const handleSearch = () => {

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
    console.log(users)
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
              }}
            >
              Search for users
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
                <CInput placeholder="Search..." placeholderTextColor={StyleVariables.colors.gray200} value={searchInput} onChangeText={setSearchInput} styles={{
                  width: '100%',
                  borderColor: StyleVariables.colors.gray200,
                }} />
              </View>
              <TouchableOpacity
                disabled={searchInput === ''}
                onPress={() => {
                  handleSearch();
                }}
              >
                <Ionicons
                  name="arrow-forward-circle"
                  size={50}
                  color={searchInput !== '' ? StyleVariables.colors.gradientStart : StyleVariables.colors.gray200}
                />
              </TouchableOpacity>
            </View>
            <View style={{
              marginTop: 10
            }}>
              {
                users?.map((user: any, index: number) => {
                  return (
                    <CUserResult callback={() => {
                      dispatch({
                        type: actions.GET_USERS,
                        payload: {
                          search: searchInput,
                        }
                      })
                    }} key={index} user={user} />
                  )
                })
              }
            </View>
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

export default SearchUserModal;
