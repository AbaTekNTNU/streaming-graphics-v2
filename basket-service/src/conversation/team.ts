import { AppState } from "..";
import { NifPlayerData, NifTeamData } from "../nifTypes";
import { Coach, Player, TeamData, TeamUpdateData } from "../types";

const getDate = (brithDate: string): Date => {
  return new Date(brithDate);
};

const formatPlayer = (player: NifPlayerData): Player => {
  return {
    firstName: player.FirstName,
    lastName: player.LastName,
    height: player.Height,
    shirtNumber: player.ShirtNo,
    isCaptain: player.IsCaptain,
    personId: Number(player.Id),
    birthDate: player.Birthday !== null ? getDate(player.Birthday) : null,
  };
};

const formatCoach = (coach: NifPlayerData): Coach => {
  return {
    firstName: coach.FirstName,
    lastName: coach.LastName,
    personId: Number(coach.Id),
  };
};

const formatTeam = (teamData: NifTeamData): TeamData => {
  return {
    coaches: teamData.Players.filter((it) => it.IsCoach).map((it) =>
      formatCoach(it)
    ),
    players: teamData.Players.filter((it) => !it.IsCoach).map((it) =>
      formatPlayer(it)
    ),
  };
};

const formatTeamData = (
  teamData: TeamUpdateData,
  appState: AppState
): AppState => {
  console.log(teamData);
  const homeTeam = formatTeam(teamData.home);
  const awayTeam = formatTeam(teamData.away);
  return { ...appState, teams: { home: homeTeam, away: awayTeam } };
};

export { formatTeamData };
