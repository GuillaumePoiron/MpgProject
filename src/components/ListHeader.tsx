import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ListHeaderProps {
  onPressJoueurName: (b: boolean) => void;
}
export default function ListHeader(props: ListHeaderProps) {
  const styles = createStylesheet();
  return (
    <View style={styles.header}>
      <Text
        style={styles.label}
        onPress={b => {
          props.onPressJoueurName(!b);
        }}>
        Joueurs
      </Text>
      <View style={styles.headerStats}>
        <Text style={styles.label}>Cote</Text>
        <Text style={styles.label}>Buts</Text>
        <Text style={styles.label}>Poste</Text>
        <Text style={styles.label}>Titu</Text>
      </View>
    </View>
  );
}
const createStylesheet = () => {
  return StyleSheet.create({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    headerStats: {
      width: '45%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'center',
    },
    label: {
      fontWeight: 'bold',
      paddingHorizontal: 4,
      paddingVertical: 6,
    },
  });
};
