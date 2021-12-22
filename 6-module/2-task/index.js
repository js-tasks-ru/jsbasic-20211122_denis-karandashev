import createElement from "../../assets/lib/create-element.js";
export default class ProductCard {
  component;

  constructor(product) {
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;
    this.create();
  }

  get elem() {
    return this.component;
  }

  create() {
    this.component = createElement(`
    <div id="holder" class="container_half">
    <div class="card">
      <div class="card__top">
        <img src="" class="card__image" alt="product">
        <span class="card__price"></span>
      </div>
      <div class="card__body">
        <div class="card__title"></div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    </div>
    `);
    this.fill();
  }

  fill() {
    const card = this.component.querySelector(".card");
    card.setAttribute('id', this.id);

    const img = card.querySelector("img");
    img.setAttribute("src", "/assets/images/products/" + this.image);

    const price = card.querySelector(".card__price");
    price.innerHTML = `€${this.price.toFixed(2)}`;

    const title = card.querySelector(".card__title");
    title.innerHTML = this.name;

    const btn = card.querySelector(".card__button");
    btn.addEventListener('click', () => {
      const event = new CustomEvent("product-add", {
        detail: this.id,
        bubbles: true
      });
      this.component.dispatchEvent(event);
    });
  }
}
