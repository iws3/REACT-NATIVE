import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

const Grid = () => {
  const data = Array.from({ length: 50 }).map((_, i) => ({ id: i.toString(), value: i + 1 }));

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.number}>{item.value}</Text>
        </View>
      )}
      numColumns={2} // 👈 grid layout (2 columns)
      columnWrapperStyle={styles.row} // optional styling for each row
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'teal',
  },
  row: {
    justifyContent: 'space-between', // space items evenly in a row
    marginBottom: 12,
  },
  item: {
    backgroundColor: 'red',
    width: '48%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  number: {
    fontSize: 27,
    color: '#fff',
  },
});
