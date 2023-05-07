import '../styles/toast.css';

// prettier-ignore
type ToastOptions = {
  style: 'success' | 'alert' | 'warn' | 'info';
  position:
    | 'top center'
    | 'top left'
    | 'top right'
    | 'bottom center'
    | 'bottom left'
    | 'bottom right';
  timeout: number;
};

export class Toast {
  private message: string;
  private options: ToastOptions;
  private toast: HTMLDivElement;
  constructor(message: string, options: ToastOptions) {
    this.message = message;
    this.options = options;
    this.toast = document.createElement('div');
  }
  init() {
    this.toast.setAttribute('role', 'alert');
    this.toast.setAttribute('aria-live', 'assertive');
    this.toast.setAttribute('aria-atomic', 'true');
    this.toast.setAttribute('aria-describedby', 'toast-message');
    this.toast.setAttribute('tabindex', '-1');

    const { position = 'top right', style = 'success' } = this.options;
    const positions = position.split(' ');

    const msg = document.createElement('div');
    msg.setAttribute('id', 'toast-message');
    msg.textContent = this.message;
    this.toast.appendChild(msg);

    this.toast.classList.add('toast', style, ...positions);
    document.querySelector('body')!.appendChild(this.toast);
  }
  show() {
    const { timeout = 4000 } = this.options;
    this.toast.classList.add('active');
    setTimeout(() => {
      this.toast.classList.remove('active');
    }, timeout);
  }
}
