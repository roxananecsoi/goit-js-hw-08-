// Exercițiul 2 - video player
// În HTML există <iframe> pentru player-ul Vimeo. Scrieți un script care va salva timpul curent de redare a videoclipului în spațiul de stocare local și, când pagina este reîncărcată, se va continua redarea videoclipului din acel moment.
// Citiți documentația pentru librăria player-ului Vimeo.
// Adăugați biblioteca ca dependență de proiect prin npm.
// Inițializați player-ul în fișierul script așa cum este descris în secțiunea pre-existing player, dar nu uitaiți faptul că player-ul din proiect este adăugat ca pachet npm și nu printr-un CDN.
// Citiți documentația metodei on() și urmărește evenimentul de timeupdate, folosind pentru a actualizați timpul de redare.
// Salvați timpul de redare în local storage. "videoplayer-current-time" va fi cheia de stocare.
// La reîncărcarea paginii, utilizați metoda setCurrentTime() pentru a relua redarea de la poziţia salvată.
// Adaugați la proiect librăria lodash.throttle și faceți astfel încât timpul de redare să fie actualizat în spațiul de stocare nu mai mult de o dată pe secundă.

// Importăm funcția throttle din pachetul 'lodash.throttle':
import throttle from 'lodash.throttle';

// Importăm clasa Vimeo pentru manipularea videourilor Vimeo:
import Vimeo from '@vimeo/player';

// Selectăm elementul iframe pentru playerul Vimeo:
const iframe = document.getElementById('vimeo-player');

// Inițializăm un nou obiect Vimeo utilizând elementul iframe selectat:
const player = new Vimeo(iframe);

// Definim funcția saveTimeToLocalStorage utilizând throttle:
const saveTimeToLocalStorage = throttle(time => {
  // Salvăm timpul curent al videoplayer-ului în localStorage:
  localStorage.setItem('videoplayer-current-time', time);
}, 1000); // Aplicăm throttle pentru a limita frecvența de apel a funcției la fiecare 1000 de milisecunde (1 secundă).

// Adaugăm un ascultător pentru evenimentul 'timeupdate' al playerului:
// (acest ascultător constă într-o funcție anonimă ce primește argumentul 'data', care este pasată ca argument către metoda 'on' a obiectului 'player'.)
player.on('timeupdate', function (data) {
  // Obținem timpul curent al videoplayer-ului din datele evenimentului:
  const currentTime = data.seconds;
  // Salvăm timpul curent în localStorage utilizând funcția saveTimeToLocalStorage:
  saveTimeToLocalStorage(currentTime);
});

// Adaugăm un ascultator si anume funcția anonimă definită ca handler pentru evenimentul 'load' al obiectului window:
window.onload = () => {
  // Obținem timpul salvat anterior din localStorage:
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime) {
    // Încercăm să setam timpul curent al playerului Vimeo utilizând valoarea salvată:
    try {
      player.setCurrentTime(storedTime);
    } catch (error) {
      // Gestionăm diferitele tipuri de erori care pot apărea:
      switch (error.name) {
        case 'RangeError':
          console.log('Invalid time.'); // Afișăm un mesaj în consolă pentru o valoare de timp invalidă.
          break;
        default:
          console.log('Error occurred.'); // Afișăm un mesaj în consolă pentru alte erori.
          break;
      }
    }
  }
};
