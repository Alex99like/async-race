class Input {
  private input: HTMLInputElement;

  constructor(type: string, className?: string) {
    this.input = document.createElement('input');
    this.addAttribute(type);
    if (className) this.addClass(className);
  }

  disabled() {
    this.input.disabled = true;
  }

  enabled() {
    this.input.disabled = false;
  }

  private addClass(className: string) {
    this.input.className = className;
  }

  private addAttribute(type: string) {
    this.input.type = type;
  }

  get node() {
    return this.input;
  }
}

export default Input;
