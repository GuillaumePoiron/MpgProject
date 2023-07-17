import React, {useCallback} from 'react';
import {StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStackParamList} from '../navigations/AppStack';
import {getListClubs, getListPlayers} from '../api/clients/mpg.api';
import {ChampionshipClubs, Player} from '../api/models';
import PlayerItem from '../components/PlayerItem';
import SearchBar from '../components/SearchBar';
import PositionFilter from '../components/PositionFilter';
import ListHeader from '../components/ListHeader';
import MpgUtils from '../utils/mpg.utils';
import {ITEM_HEIGHT, ORDER, UltraPosition} from '../constants/constants';
import {CustomPlayer} from '../types/types';

type HomeProps = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function HomeScreen({navigation}: HomeProps) {
  const styles = createStylesheet();

  const [searchValue, setSearchValue] = React.useState<string>('');
  const [positionFilters, setPositionFilters] = React.useState<number[]>([]);
  const [toggleSortByName, setToggleSortByName] = React.useState<boolean>(true);
  const [dataClubs, setDataClubs] = React.useState<ChampionshipClubs>({});
  const [dataPlayers, setDataPlayers] = React.useState<Player[]>([]);

  const customPlayers: CustomPlayer[] = React.useMemo(() => {
    if (dataClubs && dataPlayers.length) {
      return MpgUtils.formatPlayers(dataPlayers, dataClubs);
    }
    return [];
  }, [dataClubs, dataPlayers]);

  const playerFiltered = React.useMemo(() => {
    if (customPlayers.length) {
      let result = customPlayers;
      // Recherche par prénom du joueur
      if (searchValue) {
        result = MpgUtils.searchByName(searchValue, result);
      }
      // Trie par position
      if (positionFilters.length) {
        result = MpgUtils.sortByPosition(positionFilters, result);
      }
      // Trie par ordre alphabétique
      if (toggleSortByName) {
        result = MpgUtils.sortByFirstName(result, ORDER.ASC);
      } else {
        result = MpgUtils.sortByFirstName(result, ORDER.DESC);
      }
      return result;
    }
    return [];
  }, [customPlayers, searchValue, positionFilters, toggleSortByName]);

  const addOrRemovePositionFilters = (
    ultraPosition: number,
    isChecked: boolean,
  ) => {
    if (isChecked) {
      setPositionFilters([...positionFilters, ultraPosition]);
    } else {
      setPositionFilters(curr => curr.filter(it => it !== ultraPosition));
    }
  };

  const goToPlayerStats = useCallback(
    (item: CustomPlayer) => {
      navigation.navigate('PlayerStats', {
        playerId: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        leagueNum: MpgUtils.getLeagueNumForPlayer(item.clubId, dataClubs),
      });
    },
    [dataClubs, navigation],
  );

  const renderItem: ListRenderItem<CustomPlayer> = ({item}) => (
    <PlayerItem player={item} onPress={goToPlayerStats} />
  );
  const keyExtractor = (item: CustomPlayer) => item.id;
  const getItemLayout = (_: any, index: number) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  };

  const getClubsAndPlayers = async () => {
    const clubs = await getListClubs();
    const players = await getListPlayers();
    setDataClubs(clubs);
    setDataPlayers(players);
  };

  React.useEffect(() => {
    getClubsAndPlayers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        searchValue={searchValue}
        onChangeSearch={txt => setSearchValue(txt)}
      />
      <PositionFilter
        setGoalKeeperChecked={isChecked =>
          addOrRemovePositionFilters(UltraPosition.GOAL_KEEPER, isChecked)
        }
        setDefenceChecked={isChecked =>
          addOrRemovePositionFilters(UltraPosition.DEFENCE, isChecked)
        }
        setMidfielderChecked={isChecked =>
          addOrRemovePositionFilters(UltraPosition.MIDFIELDER, isChecked)
        }
        setForwardChecked={isChecked =>
          addOrRemovePositionFilters(UltraPosition.FORWARD, isChecked)
        }
      />
      <ListHeader
        onPressJoueurName={() => setToggleSortByName(!toggleSortByName)}
      />
      <FlatList
        data={playerFiltered}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

const createStylesheet = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f6fa',
    },
  });
};
