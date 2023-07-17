export interface PlayerStats {
  id: string;
  type: string;
  championships: ChampionShips;
  position: number;
  ultraPosition: number;
}

interface ChampionShips {
  [championshipId: string]: {
    clubs: {
      [key: string]: Club;
    };
    total: {
      matches: Match[];
      quotations: Quotation[];
      stats: Stats;
    };
    keySeasonStats: Ranks;
    percentRanks: Ranks;
    averagePercentRanks: Ranks;
  } & {
    [clubId: string]: {
      joinDate: string;
      stats: {};
    };
  };
}

interface Club {
  matches: Match[];
  quotations: Quotation[];
  stats: Stats;
}
interface Match {
  matchId: string;
  gameWeekNumber: number;
  date: Date;
  home: {
    clubId: string;
    score: number;
  };
  away: {
    clubId: string;
    score: number;
  };
  playerPerformance: {
    status: number;
    rating: number;
    goals: number;
    ownGoals: number;
    minutesPlayed: number;
  };
}

interface Quotation {
  quotation: number;
  date: Date;
}

export interface Stats {
  totalPlayedMatches: number;
  totalStartedMatches: number;
  totalGoals: number;
  totalOwnGoals: number;
  totalYellowCard: number;
  totalRedCard: number;
  totalMinutesPlayed: number;
  totalCleanSheet: number;
  totalGoalsConceded: number;
  totalScoringAtt: number;
  totalShotOffTarget: number;
  totalBigChanceMissed: number;
  totalPenaltiesScored: number;
  totalPenalties: number;
  totalCross: number;
  totalAccurateCross: number;
  totalContest: number;
  totalWonContest: number;
  totalWonDuel: number;
  totalDuel: number;
  totalTouches: number;
  totalLostBall: number;
  totalGoalAssist: number;
  totalIntercept: number;
  totalTackle: number;
  totalMistake: number;
  totalFouls: number;
  totalBigChanceCreated: number;
  totalAccuratePass: number;
  totalPasses: number;
  totalAccuratePassBackZone: number;
  totalPassBackZone: number;
  totalPassFwdZone: number;
  totalAccuratePassFwdZone: number;
  totalAccurateLongPass: number;
  totalLongPass: number;
  totalFouled: number;
  averageRating: number;
}

interface Ranks {
  quotation: number;
  averageRating: number;
  percentageCleanSheet: number;
  ratioGoalsConceded: number;
  ratioInterceptions: number;
  percentageStarter: number;
}
