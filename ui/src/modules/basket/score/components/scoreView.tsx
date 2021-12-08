import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { BasketSkin } from "../../basketconfig";
import { FiriLogoGender } from "../../firilogo/reducer";
import Score from "./FIRI/Score";
import NtnuiScore from "./NTNUI/NtnuiScore";

type InnerScoreProps = {
  skin: BasketSkin;
  currentPeriod: string;
  scoreState: any;
  showClock: boolean;
};

const InnerScore: React.FC<InnerScoreProps> = ({
  skin,
  scoreState,
  showClock,
  currentPeriod,
}) => {
  switch (skin) {
    case BasketSkin.FIRI_MEN:
      return (
        <Score
          home={{
            name: scoreState.teams.home.name,
            score: scoreState.score.home,
          }}
          away={{
            name: scoreState.teams.away.name,
            score: scoreState.score.away,
          }}
          logoGender={FiriLogoGender.MEN}
          period={currentPeriod}
          showClock={showClock}
        />
      );
    case BasketSkin.FIRI_WOMEN:
      return (
        <Score
          home={{
            name: scoreState.teams.home.name,
            score: scoreState.score.home,
          }}
          away={{
            name: scoreState.teams.away.name,
            score: scoreState.score.away,
          }}
          logoGender={FiriLogoGender.WOMEN}
          period={currentPeriod}
          showClock={showClock}
        />
      );
    case BasketSkin.NTNUI:
      return (
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
      );

    default:
      return <div></div>;
  }
};

const ScoreView: React.FC = () => {
  const scoreState = useSelector((state: RootState) => state.score);
  const showClock = useSelector((state: RootState) => state.score.clockVisible);
  const currentPeriod: string = useSelector(
    (state: RootState) => state.score.clock.period
  );

  const skin = useSelector((state: RootState) => state.config.skin);

  const scoreApplication = (
    <div>
      {
        <InnerScore
          skin={skin}
          showClock={showClock}
          currentPeriod={currentPeriod}
          scoreState={scoreState}
        />
      }
    </div>
  );

  return scoreState.scoreVisible ? scoreApplication : null;
};

export default ScoreView;
