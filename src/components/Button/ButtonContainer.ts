import Button from './Button';

class ButtonContainer {
  private race: Button;

  private reset: Button;

  private generatorCars: Button;

  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'panel-buttons';
    this.race = new Button('RACE', 'race');
    this.reset = new Button('RESET', 'reset');
    this.generatorCars = new Button('GENERATOR CARS', 'generator-cars');
  }

  get getNode() {
    return {
      race: this.race.node,
      reset: this.reset.node,
      generator: this.generatorCars.node,
    };
  }

  get allEl() {
    return {
      race: this.race,
      reset: this.reset,
      generator: this.generatorCars,
    };
  }

  render() {
    this.container.append(this.race.node, this.reset.node, this.generatorCars.node);
    return this.container;
  }
}

export default ButtonContainer;
