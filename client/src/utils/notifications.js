import beepFile from '@/audio/beep.mp3';

const showNotification = (title, message) => {
  const notifBody = {
    body: message,
    tag: 'cryptnet',
    silent: true, // we play our own sounds
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
  }
};

export const notify = (title, content = '') => {
  if ('Notification' in window) {
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === 'granted') {
      // If it's okay, let's create a notification
      showNotification(title, content);
    } else if (Notification.permission !== 'denied') {
      // Otherwise, we need to ask the user for permission
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          showNotification(title, content);
        }
      });
    }
  } else {
    alert('This browser does not support desktop notification');
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
