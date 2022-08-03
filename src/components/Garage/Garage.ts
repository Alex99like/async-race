import '../../styles/listCar.css';
import '../../styles/garage.css';
import { getCars } from '../../api/dbCar';
import ControlPanel from './ControlPanel';
import DataGarage from './DataGarage';
import NextPrev from './NextPrev';
import { Car } from '../car/Car';

class Garage {
  private garage: HTMLDivElement;

  controlPanel: ControlPanel;

  page: number;

  data: DataGarage;

  list: HTMLDivElement;

  pnBtn: NextPrev;

  arrElement: Car[];

  constructor() {
    this.arrElement = [];
    this.garage = document.createElement('div');
    this.list = document.createElement('div');
    this.page = 1;
    this.garage.className = 'garage';
    this.list.className = 'list-garage';
    this.controlPanel = new ControlPanel(this.renderList.bind(this));
    this.data = new DataGarage();
    this.pnBtn = new NextPrev();
    this.renderList();
  }

  async dataGarageView() {
    const res = await getCars(this.page);
    if (res.count) this.data.updateState(this.page, +res.count);
  }

  async renderList(id?: number) {
    this.dataGarageView();
    if (this.arrElement.length < 7) {
      const res = await getCars(this.page);
      const allId = this.arrElement.map((el) => el.id);

      if (id) this.arrElement = this.arrElement.filter((item) => item.id !== id);

      res.items.forEach((item) => {
        if (!allId.includes(item.id)) {
          this.arrElement.push(
            new Car(item, this.controlPanel.allInputs.update, this.renderList.bind(this)),
          );
        }
      });
      this.list.innerHTML = '';
      this.arrElement.forEach((el) => this.list.append(el.render()));
    }
  }

  render() {
    this.dataGarageView();
    this.garage.append(
      this.controlPanel.render(),
      this.data.render(),
      this.list,
      this.pnBtn.render(),
    );
    return this.garage;
  }
}

export default Garage;
