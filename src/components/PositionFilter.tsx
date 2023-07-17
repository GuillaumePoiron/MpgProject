import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface PositionFilterProps {
  setGoalKeeperChecked: (isChecked: boolean) => void;
  setDefenceChecked: (isChecked: boolean) => void;
  setMidfielderChecked: (isChecked: boolean) => void;
  setForwardChecked: (isChecked: boolean) => void;
}

export default React.memo(function PositionFilter(props: PositionFilterProps) {
  const styles = createStylesheet();

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={17}
        fillColor="#4054CC"
        unfillColor="#f5f6fa"
        textComponent={<Text style={{marginHorizontal: 4}}>Gardien</Text>}
        iconStyle={{borderColor: 'red'}}
        innerIconStyle={{borderWidth: 1.5}}
        textStyle={{fontSize: 14}}
        onPress={(isChecked: boolean) => {
          props.setGoalKeeperChecked(isChecked);
        }}
      />
      <BouncyCheckbox
        size={17}
        fillColor="#4054CC"
        unfillColor="#f5f6fa"
        textComponent={<Text style={{marginHorizontal: 4}}>Défenseur</Text>}
        iconStyle={{borderColor: 'red'}}
        innerIconStyle={{borderWidth: 1.5}}
        textStyle={{fontSize: 14}}
        onPress={(isChecked: boolean) => {
          props.setDefenceChecked(isChecked);
        }}
      />
      <BouncyCheckbox
        size={17}
        fillColor="#4054CC"
        unfillColor="#f5f6fa"
        textComponent={<Text style={{marginHorizontal: 4}}>Millieux</Text>}
        iconStyle={{borderColor: 'red'}}
        innerIconStyle={{borderWidth: 1.5}}
        textStyle={{fontSize: 14}}
        onPress={(isChecked: boolean) => {
          props.setMidfielderChecked(isChecked);
        }}
      />
      <BouncyCheckbox
        size={17}
        fillColor="#4054CC"
        unfillColor="#f5f6fa"
        textComponent={<Text style={{marginHorizontal: 4}}>Attaquant</Text>}
        style={{paddingLeft: 0, marginLeft: 0}}
        iconStyle={{borderColor: 'red'}}
        innerIconStyle={{borderWidth: 1.5}}
        textStyle={{fontSize: 14, marginLeft: 0}}
        onPress={(isChecked: boolean) => {
          props.setForwardChecked(isChecked);
        }}
      />
    </View>
  );
});

const createStylesheet = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 12,
      marginBottom: 12,
    },
  });
};
