import beepFile from '@/audio/beep.mp3';
import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
  PushNotification.localNotification({
    title: title,
    message: message,
    playSound: false, // We will handle our own sounds
    tag: 'cryptnet',
  });
};
  if ('Notification' in window) {
    const notification = new Notification(title, notifBody);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // The tab has become visible, so clear the now-stale Notification.
        notification.close();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
    // Focus window on click
    notification.onclick = function () {
      window.focus();
      notification.close();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
  } else {
    alert('This browser does not support desktop notification');
  };

export const notify = (title, content = '') => {
  if (!PushNotification) {
    alert('This device does not support notifications');
  } else {
    showNotification(title, content);
  }
};

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

export default { notify, beep };
