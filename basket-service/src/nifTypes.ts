export type NifPlayerData = {
  ShirtNo: number | null;
  Weight: number | null;
  FirstName: string;
  LastName: string;
  IsCaptain: boolean;
  TeamId: number;
  Birthday: string | null;
  IsStarter: boolean;
  IsCoach: boolean;
  Shoots: any;
  Height: number | null;
  Id: number | string | null;
  PictureFileId: any | null;
};

export type NifTeamData = {
  PeriodTime: string;
  Time: number;
  TotalMatchTime: string;
  EventType: number;
  MatchId: number;
  Period: number;
  ClientId: string;
  MatchEventType: string;
  Players: NifPlayerData[];
  PeriodName: any;
  Team: "H" | "A";
  ServerTimeStamp: string;
  Id: number | null;
};
