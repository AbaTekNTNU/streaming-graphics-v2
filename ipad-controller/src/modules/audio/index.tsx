import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Audio = () => {
  const baseUrl = useSelector((state: RootState) => state.url.value);
  const soundUri = `${baseUrl}/api/sound`;

  const audioOn = () => {
    console.log(soundUri);
    fetch(`${soundUri}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        channel: "01",
        muteValue: 1,
      }),
    });

    fetch(`${soundUri}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        channel: "02",
        muteValue: 1,
      }),
    }).then((r) => console.log(r));
  };
  const audioOff = () => {
    console.log("off");
    fetch(`${soundUri}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        channel: "01",
        muteValue: 0,
      }),
    });

    fetch(`${soundUri}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        channel: "02",
        muteValue: 0,
      }),
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          audioOn();
        }}
      >
        Lyd PÅ
      </button>

      <button
        onClick={() => {
          audioOff();
        }}
      >
        Lyd AV
      </button>
    </div>
  );
};
export default Audio;
