import React, { RefObject } from "react";
import "./DrumPad.css";

interface Props {
  id: string;
  audio: string;
  className: string;
  onMouseDown: (id: string) => void;
  onMouseUp: () => void;
}

const DrumPad = (
  { id, audio, className, onMouseDown, onMouseUp }: Props,
  audioRef: RefObject<HTMLAudioElement>
) => {
  const cls = `drum-pad ${className}`;

  return (
    <div
      className={cls}
      role="button"
      id={id}
      tabIndex={0}
      onMouseUp={onMouseUp}
      onMouseDown={() => {
        onMouseDown(id);
        console.log(id);
      }}
    >
      <span>{id}</span>
      <audio className="clip" id={id} src={audio} ref={audioRef} />
    </div>
  );
};

export default React.forwardRef(DrumPad);
