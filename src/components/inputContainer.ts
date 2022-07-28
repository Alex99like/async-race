const createCar = () => {
  const [createInputs, inputName, inputColor, btnCreate] = [document.createElement('div'), document.createElement('input'), document.createElement('input'), document.createElement('button')];
  createInputs.append(inputName, inputColor, btnCreate);
  createInputs.className = 'input-section';
  inputName.type = 'text';
  inputColor.type = 'color';
  btnCreate.textContent = 'CREATE';
  return { createInputs, inputName, inputColor };
};

const updateCar = () => {
  const [createInputs, inputName, inputColor, btnCreate] = [document.createElement('div'), document.createElement('input'), document.createElement('input'), document.createElement('button')];
  createInputs.append(inputName, inputColor, btnCreate);
  createInputs.className = 'input-section';
  inputName.type = 'text';
  inputColor.type = 'color';
  btnCreate.textContent = 'UPDATE';
  return { createInputs, inputName, inputColor };
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
  inputsContainer, createCar, updateCar, createBtnContainer,
};
