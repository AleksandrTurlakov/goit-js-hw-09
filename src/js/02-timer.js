import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startDate = selectedDates[0];
    const currentDate = new Date();
    if (startDate.getTime() < currentDate.getTime()) {
      Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
    } else startBtn.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);
const fp = document.querySelector('#datetime-picker')._flatpickr;

startBtn.addEventListener('click', onStart);

function onStart(evt) {
  startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    const date = new Date();
    const currentDate = fp.selectedDates[0];
    const deltaTime = currentDate - date;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    if (
      days === `00` &&
      hours === `00` &&
      minutes === `00` &&
      seconds === `00`
    ) {
      clearInterval(timerId);
    }
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
