import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./TeamPresentationComponent.module.css";
import { RootState } from "../../../../store/store";
import { getSimpleLogoBySkin } from "../../firilogo/utils";
import { getAge } from "../../utils";

const baseUrl = "http://localhost:4000/team";

export type Coach = {
  firstName: string;
  lastName: string;
  personId: number;
};

export type PlayerStats = {
  points: number;
  assists: number;
  turnovers: number;
};

export type Player = {
  firstName: string;
  lastName: string;
  height: number | null;
  shirtNumber: number | null;
  isCaptain: boolean;
  personId: number;
  birthDate: String | null;
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

type TeamComponentProps = {
  team: TeamData;
  name: string;
};

type TeamPresentationProps = {};

type PlayerProps = {
  player: Player;
};

const orderTeamData = (teams: TeamsState): TeamsState => {
  const compare = (a: Player, b: Player) => {
    if (a.shirtNumber === null) {
      if (b.shirtNumber === null) {
        return -1;
      } else {
        return 1;
      }
    } else if (b.shirtNumber === null) {
      return -1;
    }

    return a.shirtNumber - b.shirtNumber;
  };

  teams.home.players.sort(compare);
  teams.away.players.sort(compare);
  return teams;
};

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div className={styles.playerText}>
      <div className={styles.playerTextInfoNumber}>{player.shirtNumber} </div>
      <div className={styles.playerTextInfo}>
        <span>
          {player.firstName} {player.lastName}
        </span>
      </div>
      <div className={styles.playerTextInfoAge}>
        {player.birthDate !== null
          ? getAge(new Date(player.birthDate as string))
          : null}
      </div>
      <div className={styles.playerTextInfoHeight}>{player.height}</div>
    </div>
  );
};

type TeamHeaderProps = {
  name: string;
};

const TeamHeader: React.FC<TeamHeaderProps> = ({ name }) => {
  return (
    <div>
      <div className={styles.teamColumnName}>
        <h3>{name}</h3>
      </div>
      <div className={styles.teamNamePrsWrapper}>
        <div className={styles.teamText}>
          <div className={styles.teamTextInfoNumber}>Nr</div>
          <div className={styles.teamTextInfo}>
            <span>
              <b>Navn</b>
            </span>
          </div>
          <div className={styles.teamTextInfoAge}>
            <span>
              <b>Alder</b>
            </span>
          </div>
          <div className={styles.teamTextInfoHeight}>
            <span>
              <b>Høyde</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamComponent: React.FC<TeamComponentProps> = ({ team, name }) => {
  return (
    <div className={styles.teamPrsWrapper}>
      <div>
        <TeamHeader name={name} />
      </div>

      <div>
        {team.players.map((player) => (
          <Player player={player} />
        ))}
      </div>
    </div>
  );
};

const TeamPresentationComponent: React.FC<TeamPresentationProps> = ({}) => {
  const skin = useSelector((state: RootState) => state.config.skin);

  const [teamData, setTeamData] = useState<TeamsState | null>(null);

  useEffect(() => {
    fetch(baseUrl)
      .then((r) => r.json())
      .then((r) => {
        setTeamData(orderTeamData(r.teams));
      });
  }, []);

  if (teamData === null) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topDivider}></div>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={getSimpleLogoBySkin(skin)} />
      </div>
      <div className={styles.midContainer}>
        <TeamComponent team={teamData.home} name={"Midtbyen"} />
        <TeamComponent team={teamData.away} name={"Tromsø Strom Ungdom"} />
      </div>
      <div className={styles.basketNorgeContainer}>
        <span className={styles.basketNorgeText}>#basketnorge</span>
      </div>
    </div>
  );
};

export default TeamPresentationComponent;
