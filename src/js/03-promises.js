import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
console.log(form);

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const delayInput = document.querySelector(`[name ="delay"]`);
  const stepInput = document.querySelector(`[name ="step"]`);
  const amountInput = document.querySelector(`[name ="amount"]`);
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  setTimeout(evt => {
    for (let i = 0; i < amount; i += 1) {
      const position = i + 1;
      createPromise(position, delay + step * i)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, delay);
  evt.currentTarget.reset();
}
