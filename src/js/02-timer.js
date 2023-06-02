// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {

}

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
    start() {
        const startTime = Date.now(); 
        
        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            // console.log(currentTime);
            // console.log(currentTime - startTime);
            console.log({ days, hours, minutes, seconds });
        }, 1000)
    },
}
timer.start();


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}