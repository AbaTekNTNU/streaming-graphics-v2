import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./TeamPresentationComponent.module.css";
import { RootState } from "../../../../store/store";
import { FiriLogoGender } from "../../firilogo/reducer";
import firiLogoMen from "./../assets/top_logo_men.png";
import firiLogoWomen from "./../assets/top_logo_women.png";

const baseUrl = "http://localhost:4000/team";

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

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div className={styles.playerText}>
      <div className={styles.playerTextInfoNumber}>{player.shirtNumber} </div>
      <div className={styles.playerTextInfo}>
        <span>
          {player.firstName}
          {player.lastName}
        </span>
      </div>
      <div className={styles.playerTextInfo}>{player.height}</div>
    </div>
  );
};

type TeamHeaderProps = {
  name: string;
};

const TeamHeader: React.FC<TeamHeaderProps> = ({ name }) => {
  return (
    <div className={styles.teamText}>
      <div className={styles.teamTextInfoNumber}>Nr</div>
      <div className={styles.teamTextInfo}>
        <span>{name}</span>
      </div>
      <div className={styles.teamTextInfo}></div>
    </div>
  );
};

const TeamComponent: React.FC<TeamComponentProps> = ({ team, name }) => {
  return (
    <div className={styles.teamPrsWrapper}>
      <div className={styles.teamNamePrsWrapper}>
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
  const logoGender = useSelector((state: RootState) => state.firiLogo.gender);
  const firiLogoToUse =
    logoGender === FiriLogoGender.MEN ? firiLogoMen : firiLogoWomen;

  const [teamData, setTeamData] = useState<TeamsState | null>(null);

  useEffect(() => {
    fetch(baseUrl)
      .then((r) => r.json())
      .then((r) => {
        setTeamData(r.teams);
      });
  }, []);

  if (teamData === null) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topDivider}></div>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={firiLogoToUse} />
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
