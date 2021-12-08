import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { BasketSkin } from "../../basketconfig";
import Score from "./FIRI/Score";
import NtnuiScore from "./NTNUI/NtnuiScore";

const ScoreView: React.FC = () => {
  const scoreState = useSelector((state: RootState) => state.score);
  const logoGender = useSelector((state: RootState) => state.firiLogo.gender);
  const showClock = useSelector((state: RootState) => state.score.clockVisible);
  const currentPeriod = useSelector(
    (state: RootState) => state.score.clock.period
  );

  const skin = useSelector((state: RootState) => state.config.skin);

  const scoreApplication = (
    <div>
      {skin === BasketSkin.FIRI ? (
        <Score
          home={{
            name: scoreState.teams.home.name,
            score: scoreState.score.home,
          }}
          away={{
            name: scoreState.teams.away.name,
            score: scoreState.score.away,
          }}
          logoGender={logoGender}
          period={currentPeriod}
          showClock={showClock}
        />
      ) : (
        <NtnuiScore
          home={{
            name: scoreState.teams.home.name,
            score: scoreState.score.home,
          }}
          away={{
            name: scoreState.teams.away.name,
            score: scoreState.score.away,
          }}
          period={currentPeriod}
          showClock={showClock}
        />
      )}
    </div>
  );

  return scoreState.scoreVisible ? scoreApplication : null;
};

export default ScoreView;
