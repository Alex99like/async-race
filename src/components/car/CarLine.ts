import Button from '../Button/Button';
import renderCar from '../imgSvg/carSvg';
import renderFinish from '../imgSvg/finishSvg';

class CarLine {
  private container: HTMLDivElement;

  private start: Button;

  private stop: Button;

  private line: HTMLDivElement;

  private car: HTMLDivElement;

  private finish: HTMLDivElement;

  constructor(color: string) {
    this.container = document.createElement('div');
    this.line = document.createElement('div');
    this.car = document.createElement('div');
    this.finish = document.createElement('div');
    this.start = new Button('start', 'start');
    this.stop = new Button('stop', 'stop');
    this.stop.disabled();
    this.addAttribute(color);
  }

  private addAttribute(color: string) {
    this.container.className = 'line-car';
    this.line.className = 'line';
    this.car.className = 'car';
    this.finish.className = 'finish';
    this.car.innerHTML = renderCar(color);
    this.finish.innerHTML = renderFinish();
  }

  get getNode() {
    return {
      start: this.start.node,
      stop: this.stop.node,
      car: this.car,
      line: this.line,
    };
  }

  get getElement() {
    return {
      start: this.start,
      stop: this.stop,
    };
  }

  render() {
    this.line.append(this.car, this.finish);
    this.container.append(this.start.node, this.stop.node, this.line);
    return this.container;
  }
}

export default CarLine;
