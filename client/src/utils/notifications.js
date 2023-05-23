import beepFile from '@/audio/beep.mp3';


let theBeep;

export const beep = {
  async play() {
    if (window.Audio) {
      if (theBeep === undefined) {
        theBeep = new window.Audio(beepFile);
      }
      try {
        await theBeep.play();
      } catch (e) {
        console.log("Can't play sound.");
      }
    }
  },
};

export default { beep };
