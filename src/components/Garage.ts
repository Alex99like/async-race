import {
  createBtnContainer, createCar, inputsContainer, updateCar,
} from './inputContainer';

const createGarage = async () => {
  const body = document.querySelector('body');

  const [garageContainer] = [document.createElement('div')];
  garageContainer.classList.add('garage-container');
  const create = createCar();
  const update = updateCar();
  const btn = createBtnContainer();
  const container = inputsContainer(create.createInputs, update.createInputs, btn.btnContainer);
  garageContainer.append(container);
  body?.append(garageContainer);
};

export default createGarage;
