// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('[data-start]'),
    dateInp: document.querySelector('#datetime-picker'),
    daysVal: document.querySelector('[data-days]'),
    hoursVal: document.querySelector('data-hours'),
    minsVal: document.querySelector('[data-minutes]'),
    secVal: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    },
};

const timer = {
    intervalId: null,
    isActive: false,
    start() {
        if (this.isActive) { // коли запускаємо таймер і він вже активний, 
            return; // просто виходимо з коду
        }
        const startTime = Date.now(); // наш стартовий час
        this.isActive = true; // робимо його яктивним (якщо він був не активний) і запускаємо інтервал
        
        this.intervalId = setInterval(() => { // запускаємо інтервал, і при кожному визову фун-ії відкладенної 
            const currentTime = Date.now(); // отримуємо поточний час
            const deltaTime = currentTime - startTime; // різницю між поточним і стартовим (кількість мс)
            const { days, hours, minutes, seconds } = convertMs(deltaTime); // визиваємо convertMS(рахує скільки влазить мілісекунд в дні, години, часи ...) і повертає в {days ...}
            
            console.log(`${days}:${hours}:${minutes}:${seconds}`);
        }, 1000);
    },
};

refs.startBtn.addEventListener('click', () => {
    timer.start();
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

// приймає число, призводить до рядка і додає на початок 0 якщо число менше 2-х знаків
function addLeadingZero(val) {
    return String(val).padStart(2, '0');
};

// приймає час в (мс), рахує скільки поміщає в себе днів, годин, ..., виводить в інтерфейс
function updateClockface({ daysVal, hoursVal, minsVal, secVal }) {
    refs.daysVal.textContent = `${ daysVal }`;
    refs.hoursVal.textContent = `${ hoursVal }`;
    refs.minsVal.textContent = `${ minsVal }`;
    refs.secVal.textContent = `${ secVal }`;
};