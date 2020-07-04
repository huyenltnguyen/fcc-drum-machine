import React, { useState, useRef, useEffect } from "react";

import DrumPad from "./DrumPad";
import { hotKeys, drumPads } from "./constants";

import "./DrumMachine.css";

const DrumMachine = () => {
  const divRef = useRef();
  const audioRefs = useRef([]);
  const [selectedPad, setSelectedPad] = useState(null);

  const setAudioRef = (ref) => {
    !audioRefs.current.includes(ref) && audioRefs.current.push(ref);
  };

  const playSound = (padId) => {
    const audioRef = audioRefs.current.find((item) => item.id === padId);
    audioRef.play();
  };

  const onPadClick = (padId) => {
    setSelectedPad(padId);
    playSound(padId);
  };

  const onKeyDown = (event) => {
    const key = event.key.toUpperCase();

    if (!Object.values(hotKeys).includes(key)) return;

    setSelectedPad(key);
    playSound(key);
  };

  const onKeyUp = () => setSelectedPad(null);

  const renderDrumPads = () =>
    drumPads.map((item) => (
      <DrumPad
        key={item.id}
        id={item.id}
        audio={item.audio}
        ref={setAudioRef}
        className={selectedPad === item.id ? "selected" : ""}
        onClick={onPadClick}
      />
    ));

  // Autofocus on the wrapper div on component mount
  useEffect(() => {
    divRef.current && divRef.current.focus();
  }, []);

  return (
    <div
      id="drum-machine"
      tabIndex={0}
      ref={divRef}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      <div id="display">{selectedPad}</div>
      <div className="drum-pads">{renderDrumPads()}</div>
    </div>
  );
};

export default DrumMachine;
