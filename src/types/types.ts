import {Player} from '../api/models';

export interface ClubInfo {
  clubName?: string;
  clubLogo?: string;
}

export interface CustomPlayer extends Player, ClubInfo {
  formatPosition: string;
  tenure: number;
}

export interface PositionFilters {
  goalKeeper: boolean;
  defence: boolean;
  midfielder: boolean;
  forward: boolean;
}
