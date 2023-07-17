import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CustomPlayer} from '../types/types';
import {ITEM_HEIGHT} from '../constants/constants';

interface PlayerItemProps {
  player: CustomPlayer;
  onPress: (item: CustomPlayer) => void;
}

export default React.memo(function PlayerItem(props: PlayerItemProps) {
  const styles = createStylesheet();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onPress(props.player)}>
      <View style={styles.player}>
        <Text style={styles.playerName}>
          {props.player.firstName} {props.player.lastName}
        </Text>
        <View style={styles.club}>
          <FastImage
            style={styles.logo}
            source={{
              uri: props.player.clubLogo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text>{props.player.clubName}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <Text style={styles.label}>{props.player.quotation}</Text>
        <Text style={styles.label}>{props.player.stats.totalGoals ?? 0}</Text>
        <Text style={styles.label}>{props.player.formatPosition}</Text>
        <Text style={styles.label}>{props.player.tenure}%</Text>
      </View>
    </TouchableOpacity>
  );
});

const createStylesheet = () => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      height: ITEM_HEIGHT,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 0.2,
      paddingVertical: 6,
      borderColor: 'gray',
    },
    player: {
      width: '55%',
      paddingLeft: 12,
    },
    playerName: {
      color: '#4054CC',
      fontSize: 16,
      fontWeight: '400',
    },
    club: {
      display: 'flex',
      flexDirection: 'row',
    },
    logo: {
      width: 25,
      height: 25,
      marginRight: 4,
    },
    stats: {
      width: '45%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 12,
    },
    label: {
      width: 40,
      textAlign: 'center',
    },
  });
};
