import { AppState } from "..";
import { NifPlayerData, NifTeamData } from "../nifTypes";
import { Coach, Player, PlayerStats, TeamData, TeamUpdateData } from "../types";

const getDate = (brithDate: string): Date => {
  return new Date(brithDate);
};

const formatPlayer = (appState: AppState, player: NifPlayerData): Player => {
  const newStats: PlayerStats = {
    points: 0,
    assists: 0,
    turnovers: 0,
    shotsMade: {
      1: 0,
      2: 0,
      3: 0,
    },
    shotsMissed: {
      1: 0,
      2: 0,
      3: 0,
    },
  };

  const playerHasStatsAsUndefined = appState.undefinedPlayers.find(
    (it) => it.personId === player.Id
  );

  if (playerHasStatsAsUndefined !== undefined) {
    appState.undefinedPlayers = appState.undefinedPlayers.filter(
      (it) => it.personId !== playerHasStatsAsUndefined.personId
    );
  }

  return {
    firstName: player.FirstName,
    lastName: player.LastName,
    height: player.Height,
    shirtNumber: player.ShirtNo,
    isCaptain: player.IsCaptain,
    personId: Number(player.Id),
    birthDate: player.Birthday !== null ? getDate(player.Birthday) : null,
    stats:
      playerHasStatsAsUndefined === undefined
        ? newStats
        : playerHasStatsAsUndefined.stats,
  };
};

const formatCoach = (coach: NifPlayerData): Coach => {
  return {
    firstName: coach.FirstName,
    lastName: coach.LastName,
    personId: Number(coach.Id),
  };
};

const formatTeam = (appState: AppState, teamData: NifTeamData): TeamData => {
  return {
    coaches: teamData.Players.filter((it) => it.IsCoach).map((it) =>
      formatCoach(it)
    ),
    players: teamData.Players.filter((it) => !it.IsCoach).map((it) =>
      formatPlayer(appState, it)
    ),
  };
};

const formatTeamData = (
  teamData: TeamUpdateData,
  appState: AppState
): AppState => {
  console.log(teamData);
  const homeTeam = formatTeam(appState, teamData.home);
  const awayTeam = formatTeam(appState, teamData.away);
  return { ...appState, teams: { home: homeTeam, away: awayTeam } };
};

export { formatTeamData };
