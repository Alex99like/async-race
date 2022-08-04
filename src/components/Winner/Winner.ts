import { deleteWinner } from '../../api/dbCar';
import { getAllWinners } from '../../api/dbWinner';

class Winner {
  private container: HTMLDivElement;

  sort: 'ASC' | 'DESC';

  order: 'id' | 'wins' | 'time';

  page: number;

  constructor() {
    this.container = document.createElement('div');
    this.sort = 'ASC';
    this.order = 'time';
    this.page = 1;
  }

  // async winners() {
  
  // }

  render() {
    // this.winners();
    return this.container;
  }
}

export default Winner;
