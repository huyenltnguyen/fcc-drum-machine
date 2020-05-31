import React, { useState, useRef } from "react";
import DrumPad from "./DrumPad";
import "./DrumMachine.css";

const drumPads = [
  {
    id: "Q",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/bubbles.mp3",
  },
  {
    id: "W",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/confetti.mp3",
  },
  {
    id: "E",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/dotted-spiral.mp3",
  },
  {
    id: "A",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/flash-2.mp3",
  },
  {
    id: "S",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/glimmer.mp3",
  },
  {
    id: "D",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/piston-1.mp3",
  },
  {
    id: "Z",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/prism-1.mp3",
  },
  {
    id: "X",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/timer.mp3",
  },
  {
    id: "C",
    audio:
      "https://raw.githubusercontent.com/jonobr1/Neuronal-Synchrony/master/assets/B/wipe.mp3",
  },
];

const DrumMachine = () => {
  const audioRefs = useRef([]);
  const [selectedPad, setSelectedPad] = useState();

  const setRef = (ref) => {
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
    setSelectedPad(key);
    playSound(key);
  };

  const renderDrumPads = () =>
    drumPads.map((item) => (
      <DrumPad
        key={item.id}
        id={item.id}
        audio={item.audio}
        ref={setRef}
        className={selectedPad === item.id ? "selected" : ""}
        onClick={onPadClick}
      />
    ));

  return (
    <div id="drum-machine" onKeyDown={onKeyDown} tabIndex={0}>
      <div id="display">{selectedPad}</div>
      <div className="drum-pads">{renderDrumPads()}</div>
    </div>
  );
};

export default DrumMachine;
