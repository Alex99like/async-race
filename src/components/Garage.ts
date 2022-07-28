import createListCar from './createListCar';
import {
  createBtnContainer, createCar, inputsContainer, updateCar,
} from './inputContainer';

const createGarage = async () => {
  const body = document.querySelector('body');

  const [garageContainer, list] = [document.createElement('div'), document.createElement('div')];
  list.classList.add('list-car');
  garageContainer.classList.add('garage-container');
  const update = updateCar();
  const create = createCar();
  const btn = createBtnContainer();
  const container = inputsContainer(create.createInputs, update.createInputs, btn.btnContainer);
  garageContainer.append(container, list);
  body?.append(garageContainer);
  await createListCar();
};

export default createGarage;
