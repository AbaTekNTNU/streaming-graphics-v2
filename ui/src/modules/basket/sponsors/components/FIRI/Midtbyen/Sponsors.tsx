import React from "react";
import SponsorsContainer from "../../shared/SponsorsContainer";
import dance_studio from "./sponsors/dance_studio.png";
import frost from "./sponsors/frost.svg";
import grano from "./sponsors/Grano.png";
import weCanDoIt from "./sponsors/we_can_do_it.png";
import multiRenhold from "./sponsors/multi_renhold.png";
import snm from "./sponsors/snm_sparebank.png";
import hufs from "./sponsors/hufs.png";
import gareco from "./sponsors/gareco.png";
import SponsorRow from "../../shared/SponsorRow";
import SponsorItem from "../../shared/SponsorItem";
import dnb from "./sponsors/dnb_eiendom.png";
import vaernes from "./sponsors/VaernesPanorama.png";

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

const MidtbyenSponsors: React.FC = () => {
  const sponsors = [
    weCanDoIt,
    multiRenhold,
    hufs,
    grano,
    dnb,
    snm,
    gareco,
    dance_studio,
    frost,
    vaernes,
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

export default MidtbyenSponsors;
