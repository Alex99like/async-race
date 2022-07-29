import { checkDrive, startEngine } from '../api/apiJson';

const progress = async (el: HTMLElement, stop: HTMLButtonElement) => {
  const car = el;
  if (car.dataset.id && car.dataset.value) {
    let bool = true;
    const stopBtn = stop;
    const res = await startEngine(+car.dataset.id, 'started');
    const drive = checkDrive(+car.dataset.id);
    stopBtn.disabled = false;
    requestAnimationFrame(async function animate() {
      const state = parseFloat(el.style.marginLeft) + 0.25;
      car.style.marginLeft = `${state}%`;
      if (state < 85 && bool && car.dataset.value) {
        setTimeout(() => requestAnimationFrame(animate), res.velocity / 10);
      }
      if ((await drive).status === 500) bool = false;
    });
  }
};

const handleStart = async (
  el: HTMLElement,
  start: HTMLButtonElement,
  stop: HTMLButtonElement,
  event: MouseEvent,
) => {
  const car = el;
  const btnStart = start;
  const btnStop = stop;
  const target = event.target as HTMLElement;
  if (target.className === 'start') {
    btnStart.disabled = true;
    car.setAttribute('data-value', 'true');
    progress(el, stop);
  }

  if (target.className === 'stop' && car.dataset.id) {
    btnStop.disabled = true;
    await startEngine(+car.dataset.id, 'stopped');
    btnStart.disabled = false;
    car.style.marginLeft = '0%';
    car.removeAttribute('data-value');
  }
};

export default handleStart;
