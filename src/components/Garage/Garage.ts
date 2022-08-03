import '../../styles/listCar.css';
import '../../styles/garage.css';
import { getCars } from '../../api/dbCar';
import ControlPanel from './ControlPanel';
import DataGarage from './DataGarage';
import NextPrev from './NextPrev';
import { Car } from '../car/Car';
import ModalWinner from './ModalWinner';

class Garage {
  private garage: HTMLDivElement;

  controlPanel: ControlPanel;

  page: number;

  data: DataGarage;

  list: HTMLDivElement;

  pnBtn: NextPrev;

  arrElement: Car[];

  count: number;

  modalWinner: ModalWinner;

  constructor() {
    this.arrElement = [];
    this.garage = document.createElement('div');
    this.list = document.createElement('div');
    this.page = 1;
    this.count = 0;
    this.garage.className = 'garage';
    this.list.className = 'list-garage';
    this.controlPanel = new ControlPanel(this.renderList.bind(this), this.garageView.bind(this));
    this.data = new DataGarage();
    this.pnBtn = new NextPrev();
    this.renderList();
    this.modalWinner = new ModalWinner();
  }

  async checkRaceReset() {
    if (!this.modalWinner.state.race) {
      const map = this.arrElement.filter((el) => el.state.stateCar === 'started');
      if (map.length > 0) {
        this.controlPanel.allInputs.buttons.reset.enabled();
        this.controlPanel.allInputs.buttons.race.disabled();
      } else {
        this.controlPanel.allInputs.buttons.reset.disabled();
        this.controlPanel.allInputs.buttons.race.enabled();
      }
      this.checkCarsCount();
    } else {
      this.controlPanel.allInputs.buttons.reset.disabled();
      this.controlPanel.allInputs.buttons.race.disabled();
      this.pnBtn.getElement.prev.disabled();
      this.pnBtn.getElement.next.disabled();
    }
  }

  async garageView() {
    const res = await getCars(this.page);
    if (res.count) {
      this.data.updateState(this.page, +res.count);
      this.count = +res.count;
    }
  }

  async renderList(id?: number) {
    this.garageView();
    const res = await getCars(this.page);
    const allId = this.arrElement.map((el) => el.id);
    if (id) this.arrElement = this.arrElement.filter((item) => item.id !== id);
    if (this.arrElement.length < 7) {
      res.items.forEach((item) => {
        if (!allId.includes(item.id)) {
          this.arrElement.push(
            new Car(
              item,
              this.controlPanel.allInputs.update,
              this.renderList.bind(this),
              this.checkRaceReset.bind(this),
              this.modalWinner,
            ),
          );
        }
      });
      this.list.innerHTML = '';
      this.arrElement.forEach((el) => this.list.append(el.render()));
    }
    this.checkCarsCount();
  }

  async pagePrevNext(value: 'next' | 'prev') {
    this.pnBtn.getElement.prev.disabled();
    this.pnBtn.getElement.next.disabled();
    const page = value;
    if (page === 'next') this.page += 1;
    else this.page -= 1;

    this.arrElement.forEach(async (el) => {
      await el.stopCar();
    });
    this.arrElement.length = 0;
    await this.renderList();
    this.checkCarsCount();
  }

  checkCarsCount() {
    if (this.page <= 1) this.pnBtn.getElement.prev.disabled();
    else this.pnBtn.getElement.prev.enabled();

    if (this.count / 7 <= this.page) this.pnBtn.getElement.next.disabled();
    else this.pnBtn.getElement.next.enabled();
  }

  async raceStart() {
    this.modalWinner.setState = true;
    this.arrElement.forEach(async (el) => {
      if (el.state.stateCar === 'started') await el.stopCar();
      await el.startCar();
    });
  }

  async resetEvent() {
    this.arrElement.forEach(async (el) => {
      if (el.state.stateCar === 'started') {
        await el.stopCar();
        this.resetEvent();
      }
    });
  }

  addActiveBtn() {
    this.pnBtn.getNode.next.addEventListener('click', () => this.pagePrevNext('next'));
    this.pnBtn.getNode.prev.addEventListener('click', () => this.pagePrevNext('prev'));
    this.controlPanel.getNode.buttons.getNode.race.addEventListener('click', () => this.raceStart());
    this.controlPanel.getNode.buttons.getNode.reset.addEventListener('click', () => this.resetEvent());
  }

  render() {
    this.addActiveBtn();
    this.garageView();
    this.garage.append(
      this.modalWinner.render(),
      this.controlPanel.render(),
      this.data.render(),
      this.list,
      this.pnBtn.render(),
    );
    return this.garage;
  }
}

export default Garage;