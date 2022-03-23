import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createMenu(categories);
  }

  createMenu(categories) {
    const menu = createElement(`
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
`);

    let menuInner = menu.querySelector('.ribbon__inner');
    for (const item of this.categories) {
      menuInner.insertAdjacentHTML('beforeEnd', `<a href="#" class="ribbon__item ribbon__item_active" data-id="${item.id}">${item.name}</a>`);

      let link = menuInner.querySelectorAll('a');
      link.forEach(item => {
        item.addEventListener('click', () => {
          const ribbonSelect = new CustomEvent("ribbon-select", {
            detail: item.dataset.id,
            bubbles: true
          });
          item.dispatchEvent(ribbonSelect);
        });
      });
    }

    let buttonLeft = menu.querySelector('.ribbon__arrow_left');
    let buttonRight = menu.querySelector('.ribbon__arrow_right');

    buttonLeft.addEventListener('click', () => {
      menuInner.scrollBy(-350, 0);
    });

    buttonRight.addEventListener('click', () => {
      menuInner.scrollBy(350, 0);
    });

    return menu;
  }

}

