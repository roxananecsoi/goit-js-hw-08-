// Exercițiul 3 - formularul pentru feedback
// Codul HTML are structura unui formular. Scrieți un script care va salva valorile câmpurilor în local storage atunci când utilizatorul introduce un caracter.
// Urmăriți în formular evenimentul de input și la fiecare modificare să se salveze local un obiect cu câmpurile email și message, unde vor fi stocate valorile curente ale câmpurilor din formular. Cheia obiectului va fi "feedback-form-state"
// La încărcarea paginii, verificați starea storage-ului, iar dacă există date salvate, completați câmpurile formularului cu aceste date. În caz contrar, câmpurile vor fi goale.
// Când se trimite formularul, la evenimentul submit, ștergeți câmpurile din local storage și afișați în consolă obiectul cu câmpurile email, message și valorile lor curente.
// Asigurați-vă că datele vor fi stocate și actualizate doar o dată la 500 de milisecunde. Pentru a face acest lucru, adăugați la proiect și utilizați librăria lodash.throttle.

import throttle from 'lodash.throttle';

// Obținem referințele către elementele specifice din documentul HTML astfel, ulterior, vom putea manipula aceste elemente (accesam valori introduse de utilizator sau adăugam EventListener):
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

// Definim funcția saveToLocalStorage utilizând throttle:
const saveToLocalStorage = throttle(() => {
  // Creăm un obiect care să reprezinte starea formularului:
  const feedbackFormState = {
    email: emailInput.value, // Salvam valoarea introdusa pentru adresa de email.
    message: messageInput.value, // Salvam valoarea introdusa pentru mesaj.
  };
  // Salvam starea formularului în localStorage sub formă de string JSON:
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}, 500); // Aplicăm throttle pentru a limita frecvența de apel a funcției la fiecare 500 de milisecunde.

// Adăugam un EventListener pentru evenimentul 'input' care declanșează funcția saveToLocalStorage:
form.addEventListener('input', saveToLocalStorage);

// Adăugam un EventListener pentru evenimentul 'load' al ferestrei, care restaurează starea anterioară a formularului din localStorage:
window.addEventListener('load', () => {
  // Verificăm dacă există o stare salvată în localStorage:
  const savedState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedState) {
    // Restaurăm valorile anterioare ale adresei de email și mesajului:
    emailInput.value = savedState.email;
    messageInput.value = savedState.message;
  }
});

// Adaugăm un EventListener pentru evenimentul 'submit' al formularului:
form.addEventListener('submit', event => {
  // Previne comportamentul implicit al formularului:
  event.preventDefault();
  // Creăm un obiect care să reprezinte valorile curente ale formularului:
  const currentValues = {
    email: emailInput.value, // Salvăm valoarea actuală a adresei de email.
    message: messageInput.value, // Salvăm valoarea actuală a mesajului.
  };
  // Afișăm valorile curente ale formularului în consolă:
  console.log(currentValues);
  // Înlăturăm starea formularului din localStorage:
  localStorage.removeItem('feedback-form-state');
});
