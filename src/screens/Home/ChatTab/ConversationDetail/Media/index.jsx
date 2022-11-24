import { View, Text, FlatList, Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

const MediaLibrary = () => {
  const data = [
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
    'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZXxlbnwwfHwwfHw%3D&w=1000&q=80',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG',
    'https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt21fb20a31ce61a81/60ee13c900859160920d444a/xinzhao-splash-updated.jpg',
  ];
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        numColumns={3}
        data={data}
        renderItem={({ item }) => (
          <Image
            style={{
              width: '33.33%',
              height: 140,
            }}
            source={{ uri: encodeURI(item) }}
          />
        )}
      />
    </View>
  );
};

export default MediaLibrary;
