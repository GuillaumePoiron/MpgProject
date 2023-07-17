import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import PlayerStatsScreen from '../screens/PlayerStats';

export type AppStackParamList = {
  Home: undefined;
  PlayerStats: {
    playerId: string;
    firstName: string;
    lastName: string;
    leagueNum: string;
  };
};
const Stack = createNativeStackNavigator<AppStackParamList>();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: '#07bc0c'},
        headerTitleStyle: {color: '#f5f6fa', fontWeight: 'bold'},
        headerTitleAlign: 'center',
        headerTintColor: '#f5f6fa',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: 'Liste des joueurs'}}
      />
      <Stack.Screen
        name="PlayerStats"
        component={PlayerStatsScreen}
        options={{headerTitle: 'Détails du joueur'}}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
