import { createCar, updateCar } from '../../api/dbCar';
import '../../styles/panel.css';
import ButtonContainer from '../Button/ButtonContainer';
import InputContainer from '../Button/InputContainer';
import { IRender } from '../car/Car';
import renderCar from '../imgSvg/carSvg';
import generatorCarsFn from '../utils/generatorCars';

class ControlPanel {
  private container: HTMLDivElement;

  private createInput: InputContainer;

  private updateInput: InputContainer;

  private buttons: ButtonContainer;

  private renderList: IRender;

  constructor(render: IRender) {
    this.container = document.createElement('div');
    this.container.className = 'panel';
    this.createInput = new InputContainer('CREATE');
    this.updateInput = new InputContainer('UPDATE');
    this.updateInput.disabled();
    this.buttons = new ButtonContainer();
    this.buttons.allEl.reset.disabled();
    this.renderList = render;
  }

  get allInputs() {
    return {
      create: this.createInput,
      update: this.updateInput,
      buttons: this.buttons.allEl,
    };
  }

  get getNode() {
    return {
      create: this.createInput.allInputs,
      update: this.updateInput.allInputs,
      buttons: this.buttons,
    };
  }

  async updateBtn() {
    await updateCar(this.updateInput.getId, {
      name: this.updateInput.allInputs.name.value,
      color: this.updateInput.allInputs.color.value,
    });
    if (this.updateInput.element.color && this.updateInput.element.name) {
      this.updateInput.element.name.textContent = this.updateInput.allInputs.name.value;
      this.updateInput.element.color.innerHTML = renderCar(this.updateInput.allInputs.color.value);
    }
    this.updateInput.disabled();
  }

  async createCar() {
    await createCar({
      name: this.createInput.allInputs.name.value,
      color: this.createInput.allInputs.color.value,
    });
    this.createInput.disabled();
    this.createInput.enabled();
    this.renderList();
  }

  async generatorCars() {
    await generatorCarsFn();
    this.renderList();
  }

  addActiveBtn() {
    this.updateInput.allInputs.button.addEventListener('click', () => this.updateBtn());
    this.createInput.allInputs.button.addEventListener('click', () => this.createCar());
    this.buttons.getNode.generator.addEventListener('click', () => this.generatorCars());
  }

  render() {
    this.addActiveBtn();
    this.container.append(
      this.createInput.render(),
      this.updateInput.render(),
      this.buttons.render(),
    );
    return this.container;
  }
}

export default ControlPanel;
