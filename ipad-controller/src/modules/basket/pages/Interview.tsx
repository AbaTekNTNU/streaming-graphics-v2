import React, { useEffect, useState } from "react";
import styles from "./interview.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../sharedComponents/Button";
import { RootState } from "../../../store";
import { gotoPage } from "../reducer";
import { BasketPages } from "../types";

// type setNameOverlay = (
//   baseUrl: string,
//   player: any,
//   selectedTeam: "H" | "A"
// ) => void;

const setNamePlayerOverlay = (
  baseUrl: string,
  player: any,
  selectedTeam: "H" | "A"
) => {
  fetch(
    `${baseUrl}/basket/name-overlay/team/${selectedTeam}/player/${player.personId}`,
    { method: "POST" }
  );
};

const setCoachNameOverlay = (
  baseUrl: string,
  coach: any,
  selectedTeam: "H" | "A"
) => {
  fetch(
    `${baseUrl}/basket/name-overlay/team/${selectedTeam}/coach/${coach.personId}`,
    { method: "POST" }
  );
};

const hideNameOverlay = (baseUrl: string) => {
  fetch(`${baseUrl}/controller`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      type: "name_overlay_event",
      payload: {
        type: "control",
        event: "nameOverlay.visibility",
        value: false,
      },
    }),
  });
};

const Team: React.FC<{ team: any; selectedTeam: "H" | "A"; baseUrl: string }> =
  ({ team, selectedTeam, baseUrl }) => {
    return (
      <div className={styles.teamWrapper}>
        Players
        <div className={styles.playersWrapper}>
          {team.players.map((player: any) => {
            return (
              <Button
                key={player.personId}
                onClick={() =>
                  setNamePlayerOverlay(baseUrl, player, selectedTeam)
                }
              >
                {player.shirtNumber} {player.firstName} {player.lastName}
              </Button>
            );
          })}
        </div>
        Coaches
        <div className={styles.coachesWrapper}>
          {team.coaches.map((coach: any) => {
            return (
              <Button
                key={coach.personId}
                onClick={() =>
                  setCoachNameOverlay(baseUrl, coach, selectedTeam)
                }
              >
                {coach.firstName} {coach.lastName}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

const SelectTeamButton: React.FC<{ team: string; onClick: () => void }> = ({
  team,
  onClick,
}) => {
  return (
    <div>
      <Button onClick={onClick}>
        <span>{team}</span>
      </Button>
    </div>
  );
};

// eslint-disable-next-line
const SelectTeams: React.FC<{ setTeam: (_: "H" | "A" | null) => void }> = ({
  setTeam,
}) => {
  return (
    <>
      <SelectTeamButton onClick={() => setTeam("H")} team={"Home"} />
      <SelectTeamButton onClick={() => setTeam("A")} team={"Away"} />
    </>
  );
};

const Interview: React.FC = () => {
  const dispatch = useDispatch();
  const baseUrl = useSelector((state: RootState) => state.url.value);
  const [team, setTeam] = useState<"H" | "A" | null>(null);
  const [teamsData, setTeamsData] = useState<any>();

  useEffect(() => {
    fetch(`${baseUrl}/team`)
      .then((r) => r.json())
      .then((r) => setTeamsData(r.teams));
  }, []);

  if (teamsData === null) {
    return <div>...loading</div>;
  }
  console.log(teamsData);

  return (
    <div className={styles.interviewWrapper}>
      <Button
        onClick={() => {
          if (team === null) {
            dispatch(gotoPage({ page: BasketPages.CONTROL_BUTTONS }));
          } else {
            setTeam(null);
          }
        }}
      >
        Go back
      </Button>
      <Button onClick={() => hideNameOverlay(baseUrl)}>
        Hide name overlay
      </Button>
      {team === null ? (
        <>
          Team:
          <div className={styles.selectTeamsWrapper}>
            <SelectTeams setTeam={setTeam} />
          </div>
        </>
      ) : (
        <div>
          <Team
            team={team === "H" ? teamsData.home : teamsData.away}
            selectedTeam={team}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </div>
  );
};

export default Interview;
