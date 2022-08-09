class DataGarage {
  private container: HTMLDivElement;

  private page: HTMLHeadingElement;

  private count: HTMLHeadingElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'data-view';
    this.page = document.createElement('h3');
    this.count = document.createElement('h3');
  }

  updateState(page: number, count: number = 0): void {
    this.page.innerHTML = `Page: ${page}`;
    this.count.innerHTML = `Cars in garage: ${count}`;
  }

  render() {
    this.container.append(this.page, this.count);
    return this.container;
  }
}

export default DataGarage;
