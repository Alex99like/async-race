class Button {
  private button: HTMLButtonElement;

  constructor(text: string, className?: string) {
    this.button = document.createElement('button');
    this.addAttribute(text);
    if (className) this.addClass(className);
  }

  disabled() {
    this.button.disabled = true;
  }

  enabled() {
    this.button.disabled = false;
  }

  private addAttribute(text: string) {
    this.button.textContent = text;
  }

  private addClass(className: string) {
    this.button.className = className;
  }

  get node() {
    return this.button;
  }
}

export default Button;
