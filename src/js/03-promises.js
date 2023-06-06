import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  inputDelayEl: document.querySelector('input[name="delay"]'),
  inputStepEl: document.querySelector('input[name="step"]'),
  inputAmountEl: document.querySelector('input[name="amount"]'),
  btnSumbmitEl: document.querySelector('button[type="submit"]')
};

refs.btnSumbmitEl.addEventListener('click', onFormSubmit);


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
};


function onFormSubmit(event){
  event.preventDefault();

  let delay = Number(refs.inputDelayEl.value);
  const step = Number(refs.inputStepEl.value);
  const amount = Number(refs.inputAmountEl.value);
  
  for(let i = 0; i < amount; i += 1){
    let position = i + 1; 

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delay += step
  };
  formReset();
};


function formReset(){
  refs.formEl.reset();
};
