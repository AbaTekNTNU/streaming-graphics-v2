import { NifTeamData } from "./nifTypes";

export enum Team {
  HOME = "H",
  AWAY = "A",
}

export enum Correction {
  SCORE = "score",
  STATS = "stats",
}

export type TeamUpdateData = {
  home: NifTeamData;
  away: NifTeamData;
};

export type Coach = {
  firstName: string;
  lastName: string;
  personId: number;
};

export type PlayerStats = {
  points: number;
  assists: number;
  turnovers: number;
  shotsMade: {
    1: 0;
    2: 0;
    3: 0;
  };
  shotsMissed: {
    1: 0;
    2: 0;
    3: 0;
  };
};

export type Player = {
  firstName: string;
  lastName: string;
  height: number | null;
  shirtNumber: number | null;
  isCaptain: boolean;
  personId: number;
  birthDate: Date | null;
  stats: PlayerStats;
};

export type TeamData = {
  players: Player[];
  coaches: Coach[];
};

export type TeamsState = {
  home: TeamData;
  away: TeamData;
};

export type UndefinedPlayer = {
  personId: number;
  stats: PlayerStats;
};
