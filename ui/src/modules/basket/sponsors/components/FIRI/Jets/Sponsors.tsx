import React from "react";
import SponsorItem from "../../shared/SponsorItem";
import SponsorRow from "../../shared/SponsorRow";
import SponsorsContainer from "../../shared/SponsorsContainer";
import nte from "./sponsors/nte.png";
import norbit from "./sponsors/norbit.png";
import hufs from "./sponsors/hufs.png";
import multRenhold from "./sponsors/multi_renhold.png";
import cola from "./sponsors/cola.png";
import nidarosSparebank from "./sponsors/nidaros_sparebank.png";
import weCanDoIt from "./sponsors/we_can_do_it.png";
import soulsport from "./sponsors/soulsport.png";
import frost from "./sponsors/frost.svg";
import ttt from "./sponsors/3t.png";

const groupBy3 = (sponsors: string[]): string[][] => {
  let counter = 0;
  const result: string[][] = [];
  sponsors.forEach((sponsor) => {
    if (counter % 3 === 0) {
      result.push([sponsor]);
    } else {
      result[result.length - 1].push(sponsor);
    }
    counter++;
  });
  return result;
};

const JetsSponsors: React.FC = () => {
  const sponsors = [
    nte,
    weCanDoIt,
    nidarosSparebank,
    multRenhold,
    cola,
    hufs,
    norbit,
    soulsport,
    frost,
    ttt,
  ];

  return (
    <SponsorsContainer>
      {groupBy3(sponsors).map((sponsorColumn: string[]) => {
        return (
          <SponsorRow>
            {sponsorColumn.map((sponsor: string) => {
              return <SponsorItem src={sponsor} />;
            })}
          </SponsorRow>
        );
      })}
    </SponsorsContainer>
  );
};

export default JetsSponsors;
