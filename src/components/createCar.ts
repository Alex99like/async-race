import handleStart from './amimateCar';
import renderCar from './imgSvg/carSvg';
import renderFinish from './imgSvg/finishSvg';
import { IInput } from './inputContainer';
import removeHandler from './removeHandler';
import { updateBtn } from './updateBtn';

interface ICar {
  name: string
  color: string
  id?: number
}

const createCar = <T extends ICar>(el: T, input: IInput) => {
  const [carContainer, btnFn, name, line, car, lineCar] = [document.createElement('div'), document.createElement('div'), document.createElement('h3'), document.createElement('div'), document.createElement('div'), document.createElement('div')];
  const [select, remove, start, stop, finish] = [document.createElement('button'), document.createElement('button'), document.createElement('button'), document.createElement('button'), document.createElement('div')];
  select.textContent = 'SELECT';
  remove.textContent = 'REMOVE';
  name.textContent = `${el.name}`;
  btnFn.append(select, remove, name);
  btnFn.classList.add('button-fn');
  start.textContent = 'start';
  stop.textContent = 'stop';
  start.classList.add('start');
  stop.classList.add('stop');
  line.classList.add('line');
  stop.disabled = true;
  car.innerHTML = renderCar(el.color);
  car.classList.add('car');
  car.setAttribute('data-id', `${el.id}`);
  car.style.marginLeft = '0%';
  finish.innerHTML = renderFinish();
  finish.classList.add('finish');
  lineCar.append(car, finish);
  lineCar.classList.add('line-car');
  line.append(start, stop, lineCar);
  carContainer.append(btnFn, line);
  carContainer.classList.add('container-car');
  line.addEventListener('click', (event) => handleStart(car, start, stop, event));
  remove.addEventListener('click', () => removeHandler(car, input));
  select.addEventListener('click', () => updateBtn(input, el));
  return carContainer;
};

export default createCar;
