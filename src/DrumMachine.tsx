import React, { useState, useRef, useEffect } from "react";

import DrumPad from "./DrumPad";
import { hotKeys, drumPads } from "./constants";

import "./DrumMachine.css";

const DrumMachine = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [selectedPad, setSelectedPad] = useState<string | null>(null);

  const setPad = (padId: string) => setSelectedPad(padId);

  const unsetPad = () => setTimeout(() => setSelectedPad(null), 200);

  const playSound = (padId: string) => {
    // Use the padId to find the index of the ref in the ref array
    const refIndex = drumPads.findIndex((item) => item.id === padId);

    // Play the corresponding audio
    audioRefs.current[refIndex] && audioRefs.current[refIndex].play();
  };

  const onMouseDown = (padId: string) => {
    setPad(padId);
    playSound(padId);
  };

  const onMouseUp = unsetPad;

  const onKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key.toUpperCase();

    if (!Object.values(hotKeys).includes(key)) return;

    setPad(key);
    playSound(key);
  };

  const onKeyUp = unsetPad;

  const renderDrumPads = () =>
    drumPads.map((item, index) => (
      <DrumPad
        key={item.id}
        id={item.id}
        audio={item.audio}
        className={selectedPad === item.id ? "selected" : ""}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={(el) => (audioRefs.current[index] = el)}
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
