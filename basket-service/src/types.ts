import { NifTeamData } from "./nifTypes";

export enum Team {
  HOME = "H",
  AWAY = "A",
}

export enum Correction {
  SCORE = "score",
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

export type Player = {
  firstName: string;
  lastName: string;
  height: number | null;
  shirtNumber: number | null;
  isCaptain: boolean;
  personId: number;
  birthDate: Date | null;
};

export type TeamData = {
  players: Player[];
  coaches: Coach[];
};

export type TeamsState = {
  home: TeamData;
  away: TeamData;
};
