// On dev: change script src in the html file to index.js
// `npm run build` will spit out dist.js
// Remember to change the script src back

// Sound source: https://github.com/jonobr1/Neuronal-Synchrony
class DrumMachine {
  constructor() {
    // convert HTMLCollection to an array
    this.pads = [].slice.call(document.getElementsByTagName('input'));
    this.sounds = document.getElementsByTagName('audio');
  }

  init() {
    this.handleKeyDown();
    this.handleButtonClick();
  }

  handleKeyDown() {
    document.addEventListener(
      'keydown',
      (e) => {
        let currentPad = this.pads.find((pad) =>
          e.key.toUpperCase() === pad.value
        );

        currentPad.classList.add('clicked');
        this.playSound(e.key.toUpperCase());
      }
    );

    document.addEventListener(
      'keyup',
      (e) => {
        let currentPad = this.pads.find((pad) =>
          e.key.toUpperCase() === pad.value
        );

        currentPad.classList.remove('clicked');
      }
    );
  }

  handleButtonClick() {
    this.pads.map((pad) => {
      pad.addEventListener(
        'mousedown',
        (e) => {
          e.target.classList.add('clicked');
          this.playSound(e.target.value)
        }
      );

      pad.addEventListener(
        'mouseup',
        (e) => {
          e.target.classList.remove('clicked');
        }
      );
    });
  }

  playSound(padName) {
    // REF: work with HTMLCollection
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection

    // match sound's id with padName
    const matchedSound = this.sounds[padName];

    if (matchedSound) { matchedSound.play() }
  }
};


const drumMachine = new DrumMachine();
drumMachine.init();
