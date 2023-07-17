export interface ChampionshipClubs {
  [clubId: string]: Club;
}

export interface Club {
  id: string;
  name: {
    [lang: string]: string;
  };
  shortName: string;
  championships: {
    [key: string]: {
      jerseys: {
        [year: string]: string;
      };
      active: boolean;
    };
  };
  defaultJerseyUrl: string;
  defaultAssets: DefaultAssets;
}

interface DefaultAssets {
  logo: {
    small: string;
    medium: string;
  };
}
