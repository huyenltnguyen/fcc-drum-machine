import React from "react";
import "./DrumPad.css";

const DrumPad = ({ id, audio, className, onClick }, audioRef) => {
  const cls = `drum-pad ${className}`;

  return (
    <div className={cls} role="button" id={id} onClick={() => onClick(id)}>
      {id}
      <audio
        className="clip"
        type="audio/mpeg"
        id={id}
        src={audio}
        ref={audioRef}
      ></audio>
    </div>
  );
};

export default React.forwardRef(DrumPad);
