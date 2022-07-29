import createBtnCar from './createBtn';
import { updateHandler } from './updateBtn';

interface IInput {
  createInputs?: HTMLDivElement;
  inputName: HTMLInputElement;
  btnCreate: HTMLButtonElement;
  inputColor: HTMLInputElement;
}

const createCar = (input: IInput) => {
  const [createInputs, inputName, inputColor, btnCreate] = [document.createElement('div'), document.createElement('input'), document.createElement('input'), document.createElement('button')];
  createInputs.append(inputName, inputColor, btnCreate);
  createInputs.className = 'input-section';
  inputName.type = 'text';
  inputColor.type = 'color';
  btnCreate.textContent = 'CREATE';
  btnCreate.addEventListener('click', () => createBtnCar(inputName, inputColor, input));
  return { createInputs, inputName, inputColor };
};

const updateCar = () => {
  const [createInputs, inputName, inputColor, btnCreate] = [document.createElement('div'), document.createElement('input'), document.createElement('input'), document.createElement('button')];
  createInputs.append(inputName, inputColor, btnCreate);
  createInputs.className = 'input-section';
  inputName.type = 'text';
  inputName.disabled = true;
  inputColor.type = 'color';
  inputColor.disabled = true;
  btnCreate.textContent = 'UPDATE';
  btnCreate.disabled = true;
  btnCreate.addEventListener('click', () => updateHandler(inputName, inputColor, btnCreate));
  return {
    createInputs, inputName, inputColor, btnCreate,
  };
};

const createBtnContainer = () => {
  const [btnContainer, race, reset, generatorCars] = [document.createElement('div'), document.createElement('button'), document.createElement('button'), document.createElement('button')];
  btnContainer.classList.add('btn-container');
  race.textContent = 'RACE';
  reset.textContent = 'RESET';
  generatorCars.textContent = 'GENERATOR CARS';
  race.classList.add('race');
  reset.classList.add('reset');
  generatorCars.classList.add('generator-cars');
  btnContainer.append(race, reset, generatorCars);
  return {
    btnContainer, race, reset, generatorCars,
  };
};

const inputsContainer = (create: HTMLDivElement, update: HTMLDivElement, btn: HTMLDivElement) => {
  const [inputContainer] = [document.createElement('div')];
  inputContainer.classList.add('inputs-container');
  inputContainer.append(create, update, btn);
  return inputContainer;
};

export {
  inputsContainer, createCar, updateCar, createBtnContainer, IInput,
};
