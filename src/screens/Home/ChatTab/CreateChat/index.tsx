import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Alert, Modal, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import StyleVariables from "../../../../../StyleVariables";
import HideKeyboard from "../../../../components/HideKeyboard";
import CSelect, { SelectItem } from "../../../../components/CSelect";

const CreateChat = ({ modalVisible, setModalVisible }: {
  modalVisible: boolean,
  setModalVisible: any
}) => {
  const [selected, setSelected] = useState<SelectItem[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [data, setData] = useState<SelectItem[]>(
    [
      { label: 'Item 1', value: '1', imgUrl: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg' },
      { label: 'Item 2', value: '2' },
      { label: 'Item 3', value: '3' },
      { label: 'Item 4', value: '4' },
      { label: 'Item 5', value: '5' },
      { label: 'Item 6', value: '6' },
      { label: 'Item 7', value: '7' },
      { label: 'Item 8 sadlkfjasdlfj', value: '8' },
      { label: 'Item 8', value: '8' },
      { label: 'Item 8 dajfklasdfjksak', value: '8' },
      { label: 'Item 8', value: '8' },
      { label: 'Item 8dfsfsa', value: '8' },
    ]
  );

  useEffect(() => {
    console.log(searchInput)
  }, [searchInput])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
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
                right: 10
              }}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Ionicons name="close-circle" size={34} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'sf-pro-bold',
                marginBottom: 20,
                textAlign: 'left',
                color: StyleVariables.colors.gray300
              }}
            >
              Create new chat
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              {/* TODO: select */}
              <View style={{
                width: '85%'
              }}>
                <CSelect data={data} value={selected} onChange={setSelected} inputProps={{
                  placeholder: 'Search users ...',
                  value: searchInput,
                  onChangeText: setSearchInput
                }} />
              </View>
              <TouchableOpacity>
                <Ionicons name="arrow-forward-circle" size={50} color={StyleVariables.colors.gradientStart} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </HideKeyboard>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    width: '100%',
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.75,
    elevation: 5,
    height: '65%',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default CreateChat