import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { Player } from "../../../team/component/TeamPresentationComponent";
import { getAge } from "../../../utils";
import styles from "./PlayerOverlay.module.css";

type PlayerItems = {
  height: number | null;
  age: number | null;
  points: number;
  assists: number;
};

type PlayerItemKeys = "height" | "age" | "points" | "assists";

type PlayerItemProps = {
  items: PlayerItems;
  keyItem: PlayerItemKeys;
};

const getNorwegianNameForKey = (key: PlayerItemKeys): string => {
  let result = "";
  switch (key) {
    case "age":
      result = "Alder";
      break;
    case "height":
      result = "Høyde";
      break;
    case "points":
      result = "Poeng";
      break;
    case "assists":
      result = "Assists";
      break;
  }
  return result + ": ";
};

const getNorwegianNamePostfixForKey = (key: PlayerItemKeys): string => {
  let result = "";
  switch (key) {
    case "age":
      result = " år";
      break;
    case "height":
      result = " cm";
      break;
    case "points":
      result = "";
      break;
    case "assists":
      result = "";
      break;
  }
  return result;
};

const PlayerItem: React.FC<PlayerItemProps> = ({ items, keyItem }) => {
  if (items[keyItem] === null) return null;
  return (
    <div className={styles.playerInfoItem}>
      <span>
        {getNorwegianNameForKey(keyItem)}
        {items[keyItem]}
        {getNorwegianNamePostfixForKey(keyItem)}
      </span>
    </div>
  );
};

const PlayerOverlay: React.FC = () => {
  const playerContext = useSelector(
    (state: RootState) => state.nameOverlay.profileContext
  );

  const teamData = useSelector((state: RootState) => state.game);

  if (playerContext === null) {
    return null;
  }

  const player = playerContext?.profile as Player;

  const playerOnTeam = playerContext?.team;

  console.log(playerOnTeam);

  const logo =
    playerOnTeam === "H"
      ? teamData.home.logo
      : playerOnTeam === "A"
      ? teamData.away.logo
      : null;

  const teamName =
    playerOnTeam === "H"
      ? teamData.home.name
      : playerOnTeam === "A"
      ? teamData.away.name
      : null;

  const playerItems = {
    height: player.height,
    age:
      player.birthDate !== null
        ? getAge(new Date(player.birthDate as string))
        : null,
    points: 0,
    assists: 0,
  };

  const name = player.firstName + " " + player.lastName;
  return (
    <>
      {name !== "" && (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              {logo !== null && <img src={logo} />}
            </div>
            <div className={styles.text}>
              <div className={styles.nameContainer}>
                <h3>
                  {player.shirtNumber !== null && <>#{player.shirtNumber}</>}{" "}
                  {name}
                </h3>
              </div>
              {teamName !== "" && (
                <div className={styles.roleContainer}>
                  <span>
                    {player.isCaptain ? "Kaptein" : "Spiller"}, {teamName}
                  </span>
                </div>
              )}
              <div className={styles.playerInfoWrapper}>
                {Object.keys(playerItems).map((key: string) => {
                  return (
                    <PlayerItem
                      items={playerItems}
                      keyItem={key as PlayerItemKeys}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerOverlay;
