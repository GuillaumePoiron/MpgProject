import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TextStatsProps {
  label: string;
  stats?: number;
}
export default function TextStats(props: TextStatsProps) {
  const styles = createStylesheet();
  return (
    <View style={styles.container}>
      <Text>{props.label} :</Text>
      <Text>{props.stats ?? '/'}</Text>
    </View>
  );
}

const createStylesheet = () => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
};
