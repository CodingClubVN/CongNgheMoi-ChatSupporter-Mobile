import { TextInput, Text, View, TouchableOpacity, Image } from 'react-native'
import StyleVariables from '../../StyleVariables'
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export interface SelectItem {
  label: string,
  value: string,
  imgUrl?: string
}

interface CSelectProps {
  data: SelectItem[],
  inputProps?: any,
  value: SelectItem[],
  onChange: Function
}

const CSelect = ({ data, inputProps, value, onChange }: CSelectProps) => {

  const handleRemoveItem = (item: SelectItem) => {
    onChange(value.filter(i => i.value !== item.value))
  }

  const handleAddItem = (item: SelectItem) => {
    onChange([...value, item])
  }

  const selectedItem = (item: SelectItem, showRemove = true, key: number) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          !showRemove ? handleAddItem(item) : handleRemoveItem(item)
        }}
        style={{
          height: 40,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: item.imgUrl ? 5 : 10,
          marginRight: 5,
          marginBottom: 5,
          backgroundColor: StyleVariables.colors.gradientEnd
        }}>
        {
          item.imgUrl && (
            <Image source={{
              uri: item.imgUrl
            }} style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              marginRight: 5
            }} />)
        }

        <Text
          style={{
            fontSize: 16,
            fontFamily: 'sf-pro-reg',
            color: 'white'
          }}
        >{item.label}</Text>
        {
          showRemove ? (
            <TouchableOpacity onPress={() => {
              handleRemoveItem(item)
            }}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          ) : null
        }
      </TouchableOpacity>
    )
  }

  return (
    <View style={{
      flexGrow: 1
    }}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        borderWidth: 0.3,
        borderColor: StyleVariables.colors.gray200,
        paddingHorizontal: 10,
        borderRadius: 25,
        paddingTop: value.length ? 10 : 0,
      }}>
        {
          value.map((item: SelectItem, index: number) => {
            return selectedItem(item, true, index)
          })
        }
        <TextInput style={{
          height: 50,
          fontFamily: 'sf-pro-reg',
          fontSize: 16,
          color: StyleVariables.colors.gray300,
          width: '100%'
        }} placeholderTextColor={StyleVariables.colors.gray200} {...inputProps} />
      </View>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>
        {
          data.map((item: SelectItem, index: number) => {
            if (!value.find(i => i.value === item.value)) {
              return selectedItem(item, false, index)
            }
          })
        }
      </View>
    </View>
  )
}

export default CSelect