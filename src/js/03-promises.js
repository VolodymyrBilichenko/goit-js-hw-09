import Notiflix from 'notiflix';


const refs = {
  form: document.querySelector('.form'),
  delayInp: document.querySelector('input[name = "delay"]'),
  stepInp: document.querySelector('input[name = "step"]'),
  amountInp: document.querySelector('input[name = "amount"]'),
  sybmBtn: document.querySelector('button[type="submit"]'),
}


refs.sybmBtn.addEventListener('click', onSubmit);


function onSubmit(evt) {
  evt.preventDefault();

  let delay = Number(refs.delayInp.value);
  const step = Number(refs.stepInp.value);
  const amount = Number(refs.amountInp.value);
  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    
    createPromise(position, delay) // визиваю 
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step
  }

  refs.form.reset(); // ресет форми після закінчення виконання 
}


function createPromise(position, delay) { // генерує проміси 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
    }, delay);
  });
}
