import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  #root;
  constructor(categories) {
    this.categories = categories;
    this.initRibbon();
  }

  get elem() {
    return this.#root;
  }

  initRibbon() {
    const ribbonHTML = this.getRibbonHTML();
    const ribbonInner = ribbonHTML.querySelector(".ribbon__inner");
    const leftBtn = ribbonHTML.querySelector(".ribbon__arrow_left");
    const rightBtn = ribbonHTML.querySelector(".ribbon__arrow_right");
    const ribbonItems = ribbonHTML.querySelectorAll(".ribbon__item");

    leftBtn.addEventListener("click", () => {
      ribbonInner.scrollBy(-350, 0);
    });

    rightBtn.addEventListener("click", () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener("scroll", () => {
      this.showScrollButtons(ribbonInner, leftBtn, rightBtn);
    });

    for (const ribbonItem of ribbonItems) {
      ribbonItem.addEventListener("click", (event) => {
        event.preventDefault();
        ribbonItems.forEach(ribbonItem => ribbonItem.classList.remove("ribbon__item_active"));
        ribbonItem.classList.add("ribbon__item_active");
        console.log(ribbonItem.dataset.id);
        const customEvent = new CustomEvent("ribbon-select", {
          detail: ribbonItem.dataset.id,
          bubbles: true,
        });
        this.#root.dispatchEvent(customEvent);
      });
    }

    this.#root = ribbonHTML;
  }

  showScrollButtons(ribbonInner, leftBtn, rightBtn) {
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollRight <= 1) {
      rightBtn.classList.remove("ribbon__arrow_visible");
    } else {
      rightBtn.classList.add("ribbon__arrow_visible");
    }

    if (scrollLeft === 0) {
      leftBtn.classList.remove("ribbon__arrow_visible");
    } else {
      leftBtn.classList.add("ribbon__arrow_visible");
    }
  }

  getRibbonHTML() {
    return createElement(`
    <!--Корневой элемент RibbonMenu-->
  <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
      <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
      <a href="#" class="ribbon__item" data-id="salads">Salads</a>
      <a href="#" class="ribbon__item" data-id="soups">Soups</a>
      <a href="#" class="ribbon__item" data-id="chicken-dishes">Chicken dishes</a>
      <a href="#" class="ribbon__item" data-id="beef-dishes">Beef dishes</a>
      <a href="#" class="ribbon__item" data-id="seafood-dishes">Seafood dishes</a>
      <a href="#" class="ribbon__item" data-id="vegetable-dishes">Vegetable dishes</a>
      <a href="#" class="ribbon__item" data-id="bits-and-bites">Bits and bites</a>
      <a href="#" class="ribbon__item" data-id="on-the-side ribbon__item_active">On the side</a>
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `);
  }
}
