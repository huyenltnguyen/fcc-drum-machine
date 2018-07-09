'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// On dev: remember to change script src in the html file to index.js
// Run `npm run build` to spit out the dist.js

// Sound source: https://github.com/jonobr1/Neuronal-Synchrony
var DrumMachine = function () {
  function DrumMachine() {
    _classCallCheck(this, DrumMachine);

    // convert HTMLCollection to an array
    this.pads = [].slice.call(document.getElementsByTagName('input'));
    this.sounds = document.getElementsByTagName('audio');
  }

  _createClass(DrumMachine, [{
    key: 'init',
    value: function init() {
      this.handleKeyDown();
      this.handleButtonClick();
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown() {
      var _this = this;

      document.addEventListener('keydown', function (e) {
        var currentPad = _this.pads.find(function (pad) {
          return e.key.toUpperCase() === pad.value;
        });

        currentPad.classList.add('clicked');
        _this.playSound(e.key.toUpperCase());
      });

      document.addEventListener('keyup', function (e) {
        var currentPad = _this.pads.find(function (pad) {
          return e.key.toUpperCase() === pad.value;
        });

        currentPad.classList.remove('clicked');
      });
    }
  }, {
    key: 'handleButtonClick',
    value: function handleButtonClick() {
      var _this2 = this;

      this.pads.map(function (pad) {
        pad.addEventListener('mousedown', function (e) {
          e.target.classList.add('clicked');
          _this2.playSound(e.target.value);
        });

        pad.addEventListener('mouseup', function (e) {
          e.target.classList.remove('clicked');
        });
      });
    }
  }, {
    key: 'playSound',
    value: function playSound(padName) {
      // REF: work with HTMLCollection
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection

      // match sound's id with padName
      var matchedSound = this.sounds[padName];

      if (matchedSound) {
        matchedSound.play();
      }
    }
  }]);

  return DrumMachine;
}();

;

var drumMachine = new DrumMachine();
drumMachine.init();
