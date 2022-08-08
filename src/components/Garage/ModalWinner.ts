import {
  createWinner, getAllWinners, getWinner, updateWinner,
} from '../../api/dbWinner';
import { ICar } from '../../api/IApi';
import '../../styles/modal.css';

class ModalWinner {
  private container: HTMLDivElement;

  public state: { race: boolean; };

  private title: HTMLHeadingElement;

  private allWinners: Array<number>;

  constructor() {
    this.container = document.createElement('div');
    this.state = { race: false };
    this.title = document.createElement('h1');
    this.allWinners = [];
  }

  public async viewWinner(car: ICar, velocity: number): Promise<void> {
    if (this.state.race) {
      const speed = +(velocity / 14).toFixed(2);
      this.removeModal();
      this.container.className = 'modal-window';
      this.title.className = 'modal-winner-title';
      this.title.textContent = `${car.name} went first [${speed}s]!`;
      this.container.append(this.title);
      await this.getWinners();
      if (this.allWinners.includes(car.id)) {
        const res = await getWinner(car.id);
        await updateWinner({
          id: car.id,
          time: res.time < speed ? res.time : speed,
          wins: res.wins += 1,
        });
      } else {
        await createWinner({
          id: car.id,
          time: speed,
          wins: 1,
        });
      }
    }
    this.state.race = false;
  }

  private async getWinners(): Promise<void> {
    const arr = await getAllWinners(1, 'id', 'ASC', 1000);
    this.allWinners = arr.result.map((el) => el.id);
  }

  private removeModal(): void {
    this.container.addEventListener('click', () => {
      this.container.className = '';
      this.container.innerHTML = '';
    });
  }

  public set setState(value: boolean) {
    this.state.race = value;
  }

  public render(): HTMLDivElement {
    return this.container;
  }
}

export default ModalWinner;
