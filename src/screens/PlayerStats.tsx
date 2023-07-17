import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigations/AppStack';
import {PlayerStats, Stats} from '../api/models';
import {getPlayerDetails} from '../api/clients/mpg.api';
import CardStats from '../components/CardStats';
import MpgUtils from '../utils/mpg.utils';
import TextStats from '../components/TextStats';

type PlayerProps = NativeStackScreenProps<AppStackParamList, 'PlayerStats'>;

function PlayerStatsScreen({route}: PlayerProps) {
  const styles = createStylesheet();
  const [playerStats, setPlayerStats] = React.useState<PlayerStats>();

  const stats: Stats | null = React.useMemo(() => {
    if (playerStats) {
      return playerStats?.championships[route.params.leagueNum].total.stats;
    }
    return null;
  }, [playerStats, route.params.leagueNum]);

  const getPlayerStats = async (playerId: string) => {
    const data = await getPlayerDetails(playerId);
    setPlayerStats(data);
  };

  React.useEffect(() => {
    getPlayerStats(route.params.playerId);
  }, [route.params.playerId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameTitle}>
            {route.params.firstName} {route.params.lastName}
          </Text>
          <Text style={styles.positionTitle}>
            {MpgUtils.formatPoste(playerStats?.position)}
          </Text>
        </View>
        <View>
          <CardStats title="Résumé stats">
            <TextStats label="Moyenne des notes" stats={stats?.averageRating} />
            <TextStats
              label="Nombre de matchs joués"
              stats={stats?.totalPlayedMatches}
            />
            <TextStats
              label="Nombre de matchs débutés"
              stats={stats?.totalStartedMatches}
            />
            <TextStats
              label="Nombre de minutes joués"
              stats={stats?.totalMinutesPlayed}
            />
            <TextStats
              label="Nombre de cartons jaunes"
              stats={stats?.totalYellowCard}
            />
            <TextStats
              label="Nombre de cartons rouges"
              stats={stats?.totalRedCard}
            />
          </CardStats>

          <CardStats title={'Efficace ?'}>
            <TextStats label="Duels remportés" stats={stats?.totalWonDuel} />
            <TextStats label="Pertes de balle" stats={stats?.totalLostBall} />
            <TextStats label="Fautes subies" stats={stats?.totalFouled} />
            <TextStats label="Fautes commises" stats={stats?.totalFouls} />
            <TextStats label="Tirs cadrés" stats={stats?.totalShotOffTarget} />
          </CardStats>

          <CardStats title={'Il plante ?'}>
            <TextStats label="Buts" stats={stats?.totalGoals} />
            <TextStats
              label="Grosses occassions ratées"
              stats={stats?.totalBigChanceMissed}
            />
          </CardStats>

          <CardStats title="Un as de la passe ?">
            <TextStats
              label="Passes décisives"
              stats={stats?.totalGoalAssist}
            />
            <TextStats label="Passes réussis" stats={stats?.totalPasses} />
            <TextStats
              label="Passes réussis dans son camp"
              stats={stats?.totalPassBackZone}
            />
            <TextStats
              label="Passes réussis dans le camp adverse"
              stats={stats?.totalPassFwdZone}
            />
            <TextStats
              label="Passes longues réussis"
              stats={stats?.totalLongPass}
            />
            <TextStats label="Centres réussis" stats={stats?.totalCross} />
          </CardStats>

          <CardStats title="Solide ?">
            <TextStats label="Interceptions" stats={stats?.totalIntercept} />
            <TextStats label="Tacles" stats={stats?.totalTackle} />
            <TextStats
              label="Buts encaissés"
              stats={stats?.totalGoalsConceded}
            />
          </CardStats>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStylesheet = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f6fa',
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    headerContainer: {
      alignItems: 'center',
      paddingBottom: 12,
    },
    nameTitle: {
      color: '#4054CC',
      fontSize: 22,
      fontWeight: 'bold',
    },
    positionTitle: {
      fontSize: 18,
    },
  });
};

export default PlayerStatsScreen;
