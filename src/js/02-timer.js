// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Додатковий імпорт спливаючих вікон
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    dateInp: document.querySelector('#datetime-picker'),
    daysVal: document.querySelector('[data-days]'),
    hoursVal: document.querySelector('[data-hours]'),
    minsVal: document.querySelector('[data-minutes]'),
    secVal: document.querySelector('[data-seconds]'),
    inputDate: document.querySelector('#datetime-picker'),
    timerStyle: document.querySelector('.timer'),
    clockFaceStyle: document.querySelector('.field'),
};

styleTimer(); // виклик стилів на таймер

refs.startBtn.addEventListener('click', () => {
    timer.start();
});
refs.startBtn.disabled = true; // кнопка не активна з початку

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const todayDate = new Date();
        const choseDate = selectedDates[0];
        if (choseDate < todayDate) { // перевірка на від'ємний час 
            Notiflix.Notify.failure("Please choose a date in the future");
            refs.startBtn.disabled = true;
        } else {
            refs.startBtn.disabled = false;
        };
            
    },
};
flatpickr(refs.inputDate, options);

const timer = {
    intervalId: null,
    isActive: false,
    start() {
        if (this.isActive) { // коли запускаємо таймер і він вже активний, 
            return; // просто виходимо з коду
        }
        const startTime = flatpickr.parseDate(refs.inputDate.value, "Y-m-d H:i:S"); // наш стартовий час. підключаємо як options
        this.isActive = true; // робимо його яктивним (якщо він був не активний) і запускаємо інтервал
        refs.startBtn.disabled = true;

        this.intervalId = setInterval(() => { // запускаємо інтервал, і при кожному визову фун-ії відкладенної 
            const currentTime = Date.now(); // отримуємо поточний час
            const deltaTime = startTime - currentTime; // різницю між поточним і стартовим (кількість мс)
            const time = convertMs(deltaTime); // визиваємо convertMS(рахує скільки влазить мілісекунд в дні, години, часи ...) і повертає в {days ...}
            
            updateClockface(time);

            if (deltaTime < 0) {
                clearInterval(this.intervalId); // чистимо інтервал 
                updateClockface(convertMs(0)); // скидуємо значення на 0
                Notiflix.Notify.success("SELLOUT");
            }
        }, 1000);
    },
};

// ДРУГИЙ СПОСІБ ЗА ДОПОМОГОЮ class
// class Timer {
//     constructor({onTick}) {
//         this.intervalId = null;
//         this.isActive = false;
//         this.onTick = onTick; // посилання на функцію updateClockface
//     };

//     start() {
//         if (this.isActive) { // коли запускаємо таймер і він вже активний, 
//             return; // просто виходимо з коду
//         }
//         const startTime = flatpickr.parseDate(refs.inputDate.value, "Y-m-d H:i:S"); // наш стартовий час. підключаємо як options
//         this.isActive = true; // робимо його яктивним (якщо він був не активний) і запускаємо інтервал
//         refs.startBtn.disabled = true;

//         this.intervalId = setInterval(() => { // запускаємо інтервал, і при кожному визову фун-ії відкладенної 
//             const currentTime = Date.now(); // отримуємо поточний час
//             const deltaTime = startTime - currentTime; // різницю між поточним і стартовим (кількість мс)
//             const time = convertMs(deltaTime); // визиваємо convertMS(рахує скільки влазить мілісекунд в дні, години, часи ...) і повертає в {days ...}
            
//             updateClockface(time);

//             if (deltaTime <= 0) {
//                 clearInterval(this.intervalId); // чистимо інтервал 
//                 updateClockface(convertMs(0)); // скидуємо значення на 0
//                 Notiflix.Notify.success("SELLOUT");
//             } else {
//                 this.onTick(time); // визиваємо фун-ю куди передаємо час
//             }
//         }, 1000);
//     }
// };

// const timer = new Timer({
//     onTick: updateClockface
// });
// ДРУГИЙ СПОСІБ ЗА ДОПОМОГОЮ class

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
function updateClockface({ days, hours, minutes, seconds }) {
    refs.daysVal.textContent = `${days}`;
    refs.hoursVal.textContent = `${hours}`;
    refs.minsVal.textContent = `${minutes}`;
    refs.secVal.textContent = `${seconds}`;
};

function styleTimer() {
    refs.timerStyle.style.display = 'flex';
    refs.timerStyle.style.gap = '15px';

    // refs.clockFaceStyle.forEach(el => {
    //     el.style.display = 'flex';
    //     el.style.flexDirection = 'column';
    // });
    // refs.styleTimer.style.display = 'flex';
    // refs.styleTimer.style.flexDirection = 'column';
};