import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CardStatsProps {
  title: string;
  children: React.ReactNode;
}
export default function CardStats(props: CardStatsProps) {
  const styles = createStylesheet();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.stats}>{props.children}</View>
    </View>
  );
}

const createStylesheet = () => {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: 12,
    },
    title: {
      color: '#4054CC',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    stats: {
      marginVertical: 12,
    },
  });
};
