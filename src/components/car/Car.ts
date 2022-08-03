import { deleteCar, driveState, statusEngine } from '../../api/dbCar';
import { ICar } from '../../api/IApi';
import Button from '../Button/Button';
import InputContainer from '../Button/InputContainer';
import ModalWinner from '../Garage/ModalWinner';
import countVelocity from '../utils/countVelocity';
import CarLine from './CarLine';

// eslint-disable-next-line no-unused-vars
type IRender = (id?: number) => Promise<void>;

class Car {
  private container: HTMLDivElement;

  private select: Button;

  private remove: Button;

  private title: HTMLHeadingElement;

  private lineCar: CarLine;

  public id: number;

  state: { stateCar: 'started' | 'stopped', distance: number, bool: boolean; };

  renderList: IRender;

  update: InputContainer;

  data: ICar;

  checkRaceReset: () => Promise<void>;

  winner: ModalWinner;

  constructor(
    car: ICar,
    update: InputContainer,
    render: IRender,
    check: () => Promise<void>,
    winner: ModalWinner,
  ) {
    this.container = document.createElement('div');
    this.remove = new Button('REMOVE');
    this.select = new Button('SELECT');
    this.title = document.createElement('h4');
    this.data = car;
    this.checkRaceReset = check;
    this.update = update;
    this.lineCar = new CarLine(car.color);
    this.id = car.id;
    this.addAttribute(car.name);
    this.renderList = render;
    this.state = { stateCar: 'stopped', distance: 0, bool: false };
    this.createCar();
    this.winner = winner;
  }

  private addAttribute(name: string) {
    this.container.className = 'car-item';
    this.title.textContent = name;
  }

  async startCar() {
    const finish = this.lineCar.getNode.line.clientWidth;
    this.lineCar.getElement.start.disabled();
    const carStatus = await statusEngine(this.id, 'started');
    this.state.stateCar = 'started';
    this.lineCar.getElement.stop.enabled();
    const car = this;
    const drive = driveState(this.id);
    this.state.bool = true;
    requestAnimationFrame(async function animate() {
      car.checkRaceReset();
      car.state.distance += carStatus.velocity / countVelocity(finish);
      car.lineCar.getNode.car.style.left = `${car.state.distance}px`;
      if (car.state.distance < finish - 50 && car.state.bool && car.state.stateCar === 'started') {
        if (car.state.distance > finish - 51) car.winner.viewWinner(car.data, carStatus.velocity);
        requestAnimationFrame(animate);
      }
      if ((await drive).status === 500) {
        car.state.bool = false;
      }
    });
  }

  async stopCar() {
    this.lineCar.getElement.stop.disabled();
    await statusEngine(this.id, 'stopped');
    this.state.stateCar = 'stopped';
    this.checkRaceReset();
    this.state.distance = 0;
    this.state.bool = false;
    this.lineCar.getElement.start.enabled();
    this.lineCar.getNode.car.style.left = `${this.state.distance}%`;
  }

  async removeBtn() {
    this.remove.disabled();
    this.select.disabled();
    await this.stopCar();
    await deleteCar(this.id);
    this.renderList(this.id);
  }

  updateBtn() {
    this.update.enabled();
    this.update.allInputs.name.focus();
    this.update.allInputs.name.value = this.data.name;
    this.update.allInputs.color.value = this.data.color;
    this.update.getId = this.id;
    this.update.element.name = this.title;
    this.update.element.color = this.lineCar.getNode.car;
  }

  addActiveBtn() {
    this.lineCar.getNode.start.addEventListener('click', () => this.startCar());
    this.lineCar.getNode.stop.addEventListener('click', () => this.stopCar());
    this.remove.node.addEventListener('click', () => this.removeBtn());
    this.select.node.addEventListener('click', () => this.updateBtn());
  }

  createCar() {
    this.addActiveBtn();
    this.container.append(this.remove.node, this.select.node, this.title, this.lineCar.render());
  }

  render() {
    return this.container;
  }
}

export { Car, IRender };
