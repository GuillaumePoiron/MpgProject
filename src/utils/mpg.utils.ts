import {ChampionshipClubs, Player} from '../api/models';
import {ORDER, UltraPosition} from '../constants/constants';
import {CustomPlayer} from '../types/types';

class MpgUtils {
  /**
   * Retourne la liste des joueurs en ajoutant son club associé
   * @param players
   * @param clubs
   * @returns
   */
  static formatPlayers(
    players: Player[],
    clubs: ChampionshipClubs,
  ): CustomPlayer[] {
    return players.map(player => {
      const clubObject = clubs[player.clubId];
      return {
        ...player,
        formatPosition: MpgUtils.formatOneLetterPoste(player?.position),
        tenure:
          Math.round(
            (player?.stats.totalStartedMatches / player?.stats.totalMatches) *
              100,
          ) || 0,
        clubName: clubObject?.name['fr-FR'],
        clubLogo: clubObject?.defaultAssets.logo.medium,
      };
    });
  }

  /**
   * Retourne le numéro de la ligue active
   * @param clubId
   * @param championshipClubs
   * @returns
   */
  static getLeagueNumForPlayer(
    clubId: string,
    championshipClubs: ChampionshipClubs,
  ): string {
    let keyele = '';
    Object.entries(championshipClubs[clubId].championships).find(
      ([key, value]) => {
        keyele = key;
        if (value.active) {
          return true;
        }
        return false;
      },
    );
    return keyele;
  }

  /**
   * Retourne la liste des joueurs selon la recherche
   * @param searchValue
   * @param data
   * @returns
   */
  static searchByName(
    searchValue: string,
    data: CustomPlayer[],
  ): CustomPlayer[] {
    return data.filter(player => {
      const searchValueUpper = searchValue.toUpperCase();
      const playerNameUpper =
        player.firstName && player.lastName
          ? player?.firstName.toUpperCase() +
            ' ' +
            player?.lastName.toUpperCase()
          : ''.toUpperCase();
      return playerNameUpper.indexOf(searchValueUpper) > -1;
    });
  }

  /**
   * Retourne la liste des joueurs trié par ordre alphabétique Croissant ou Décroissant
   * @param data
   * @param order
   * @returns
   */
  static sortByFirstName(data: CustomPlayer[], order: string): CustomPlayer[] {
    if (order === ORDER.ASC) {
      return data.sort((a, b) => {
        if (a.firstName > b.firstName) {
          return 1;
        }
        if (a?.firstName < b?.firstName) {
          return -1;
        }
        return 0;
      });
    } else if (order === ORDER.DESC) {
      return data.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return 1;
        }
        if (a?.firstName > b?.firstName) {
          return -1;
        }
        return 0;
      });
    } else {
      return data;
    }
  }

  /**
   * Retourne la liste des joueurs trié par position
   * @param positionFilters
   * @param data
   * @returns
   */
  static sortByPosition(
    positionFilters: number[],
    data: CustomPlayer[],
  ): CustomPlayer[] {
    return data.filter(player => {
      let filter;
      for (const position of positionFilters) {
        if (position === UltraPosition.GOAL_KEEPER) {
          filter = filter || player.ultraPosition === UltraPosition.GOAL_KEEPER;
        }
        if (position === UltraPosition.DEFENCE) {
          filter = filter || player.ultraPosition === UltraPosition.DEFENCE;
        }
        if (position === UltraPosition.MIDFIELDER) {
          filter = filter || player.ultraPosition === UltraPosition.MIDFIELDER;
        }
        if (position === UltraPosition.FORWARD) {
          filter = filter || player.ultraPosition === UltraPosition.FORWARD;
        }
      }
      return filter;
    });
  }

  /**
   * Récupère la lettre du poste
   * @param positionId
   * @returns
   */
  static formatOneLetterPoste(positionId: number): string {
    switch (positionId) {
      case 1:
        return 'G';
      case 2:
        return 'D';
      case 3:
        return 'M';
      case 4:
        return 'A';
      default:
        return '?';
    }
  }

  /**
   * Récupère le mot du poste
   * @param positionId
   * @returns
   */
  static formatPoste(positionId: number | undefined): string {
    switch (positionId) {
      case 1:
        return 'Gardien';
      case 2:
        return 'Défenseur';
      case 3:
        return 'Millieu';
      case 4:
        return 'Attaquant';
      default:
        return '?';
    }
  }
}

export default MpgUtils;
