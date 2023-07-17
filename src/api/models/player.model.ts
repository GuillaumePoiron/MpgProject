export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: Stats;
}

interface Stats {
  averageRating: number;
  totalGoals: number;
  totalMatches: number;
  totalStartedMatches: number;
  totalPlayedMatches: number;
}
