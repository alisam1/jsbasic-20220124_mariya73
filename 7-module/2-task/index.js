import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #elem;
  #closeOnEscListener;

  constructor() {
    this.#elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
            </h3>
          </div>

          <div class="modal__body">
          </div>
        </div>

      </div>`); 
      

      this.#elem.addEventListener('click', (e) => {
        if (e.target.closest('.modal__close')) {
          e.preventDefault();
          this.close();
        }
      });
  }

  closeOnEsc(e) {
    if (e.code === 'Escape') {
      e.preventDefault();
      this.close();
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.insertAdjacentElement('beforeend', this.#elem);

    this.#closeOnEscListener = (e) => this.closeOnEsc(e);
    document.addEventListener('keydown', this.#closeOnEscListener);
  }

  close() {
    document.removeEventListener('keydown', this.#closeOnEscListener);
    document.body.classList.remove('is-modal-open');
    this.#elem.remove();
  }

  setTitle(title) {
    this.#elem.querySelector('.modal__title').innerText = title;
  }

  setBody(node) {
    const body = this.#elem.querySelector('.modal__body');
    body.innerHTML = '';
    body.appendChild(node);
  }
}}
