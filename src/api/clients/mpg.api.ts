import axios from 'axios';
import {ChampionshipClubs, Player, PlayerStats} from '../models';

const api = axios.create({
  baseURL: 'https://api.mpg.football/api/data',
});

export async function getListClubs(): Promise<ChampionshipClubs> {
  const res = await api.get('/championship-clubs');
  return res.data.championshipClubs;
}

export async function getListPlayers(): Promise<Player[]> {
  const res = await api.get('/championship-players-pool/1');
  return Object.values(res.data.poolPlayers);
}

export async function getPlayerDetails(idPlayer: string): Promise<PlayerStats> {
  const res = await api.get(`/championship-player-stats/${idPlayer}/2022`);
  return res.data;
}
