import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface SearchBarProps {
  searchValue: string;
  onChangeSearch: (txt: string) => void;
}
export default function SearchBar(props: SearchBarProps) {
  const styles = createStylesheet();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un joueur"
        value={props.searchValue}
        onChangeText={props.onChangeSearch}
      />
    </View>
  );
}

const createStylesheet = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    input: {
      height: 40,
      width: '100%',
      borderWidth: 0.5,
      borderColor: '#95a5a6',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 12,
    },
  });
};
