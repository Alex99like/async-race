import { ICar, updateCar } from '../api/apiJson';
import createListCar from './createListCar';
import { IInput } from './inputContainer';

const updateHandler = async (
  name: HTMLInputElement,
  color: HTMLInputElement,
  btn: HTMLButtonElement,
) => {
  const [nameInput, colorInput, id] = [name, color, btn];
  if (id.dataset.id) {
    await updateCar(+id.dataset.id, {
      name: nameInput.value,
      color: colorInput.value,
    });
  }
  id.disabled = true;
  nameInput.disabled = true;
  colorInput.disabled = true;
  colorInput.value = '#ffffff';
  await createListCar({ btnCreate: id, inputName: name, inputColor: color });
};

const updateBtn = async (input: IInput, el: ICar) => {
  const update = input;
  update.inputColor.disabled = false;
  update.inputName.disabled = false;
  update.btnCreate.disabled = false;
  update.inputName.focus();
  update.inputName.value = el.name;
  update.inputColor.value = el.color;
  if (el.id) update.btnCreate.setAttribute('data-id', `${el.id}`);
};

export { updateBtn, updateHandler };
