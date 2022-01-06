import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
  }

  get elem() {
    return this.render();
  }

  render() {
    let filteredProducts = this.updateFilter(this.filters);
    const elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
  `);
    const list = elem.querySelector(".products-grid__inner");
    for (const p of filteredProducts) {
      const card = new ProductCard(p).elem;
      list.append(card);
    }
    return elem;
  }

  updateFilter(filters) {
    for (const key in filters) {
      this.filters[key] = filters[key];
    }

    if (Object.keys(filters).length == 0) {
      return this.products;
    } else {
      let products = this.products;

      // - `filters.noNuts` - `true/false` - если значение `true`, то нужно показать только товары `без орехов`,
      // т.е. товары, у которых в свойстве `nuts` стоит `false` или такое свойство отсутствует вовсе.
      // Если значение `false` - то не учитываем этот критерий.
      if (this.filters.noNuts) {
        products = this.products.filter((p) => !p.nuts);
      }

      // - `filters.vegeterianOnly` - `true/false` - если значение `true`, то нужно показать только `вегетарианские` товары,
      // т.е. товары, у которых в свойстве `vegeterian` стоит `true`. Если значение `false` - то не учитываем этот критерий.
      if (this.filters.vegeterianOnly) {
        products = products.filter((p) => p.vegeterian);
      }

      // - `filters.maxSpiciness` - `число от 0 до 4` - показывать только те товары,
      // у которых в свойстве `spiciness` число меньше или равное заданному.
      if (this.filters.maxSpiciness) {
        products = products.filter((p) => p.spiciness <= this.filters.maxSpiciness);
      }

      // - `filters.category` - `уникальный идентификатор категории` - показывать только те товары, у которых
      // в свойстве `category` такое же значение.
      // Если здесь передана пустая строка или такого свойства нет в `filters` - показывать все товары.
      if (this.filters.category) {
        products = products.filter((p) => p.category === this.filters.category);
      }

      return products;
    }
  }
}
