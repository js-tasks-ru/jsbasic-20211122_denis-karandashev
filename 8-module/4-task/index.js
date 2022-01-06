import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product && this.cartItems) {
      // if (this.cartItems.length > 0) {
      for (const cardItem of this.cartItems) {
        if (cardItem.product.id === product.id) {
          cardItem.count++;
          this.onProductUpdate(cardItem);
          return;
        }
      }
      const newItem = {
        product,
        count: 1,
      };
      this.cartItems.push(newItem);
      this.onProductUpdate(newItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count += amount;

    if (cartItem.count === 0) {
      const itemToRemove = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(itemToRemove, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let count = 0;
    if (this.cartItems.length > 0) {
      for (const cartItem of this.cartItems) {
        count += cartItem.count;
      }
    }
    return count;
  }

  getTotalPrice() {
    let price = 0;
    if (this.cartItems.length > 0) {
      for (const cartItem of this.cartItems) {
        price += cartItem.count * cartItem.product.price;
      }
    }
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // let modal = new Modal();
    // modal.setTitle("Your order");
    // let body = createElement("<div></div>");
    // for (const item of this.cartItems) {
    //   const row = this.renderProduct(item.product, item.count);
    //   const id = item.product.id;

    //   row
    //     .querySelector(".cart-counter__button_minus")
    //     .addEventListener("click", () => {
    //       // console.log('minus', id);
    //       this.updateProductCount(item.product.id, -1);
    //     });

    //   row
    //     .querySelector(".cart-counter__button_plus")
    //     .addEventListener("click", () => {
    //       // console.log('plus', id);
    //       this.updateProductCount(item.product.id, 1);
    //     });

    //   body.append(row);
    // }
    // const orderForm = this.renderOrderForm();
    // orderForm.addEventListener("submit", (event) => this.onSubmit(event));

    // body.append(orderForm);
    // modal.setBody(body);

    // this.modal.elem.addEventListener('modal-close', () => {
    //   this.modal = null;
    //   this.modalBody = null;
    // });

    // modal.open();

    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modalBody = document.createElement('div');

    for (let { product, count } of this.cartItems) {
      this.modalBody.append(this.renderProduct(product, count));
    }

    this.modalBody.append(this.renderOrderForm());
    this.modalBody.addEventListener('click', this.onModalBodyClickHandler);
    this.modalBody.querySelector('form').onsubmit = (event) => this.onSubmit(event);
    this.modal.setBody(this.modalBody);

    this.modal.elem.addEventListener('modal-close', () => {
      this.modalBody = null;
      this.modal = null;
    });

    this.modal.open();
  }

  onModalBodyClickHandler = (event) => {
    if (event.target.closest(".cart-counter__button")) {
      const productElem = event.target.closest("[data-product-id]");
      const productId = productElem.dataset.productId;
      this.updateProductCount(
        productId,
        event.target.closest(".cart-counter__button_plus") ? 1 : -1
      );
    }
  };

  onProductUpdate({product, count}) {
    this.cartIcon.update(this);

    if (!this.modal || !document.body.classList.contains('is-modal-open')) {
      return;
    }

    if (this.cartItems.length === 0 || !this.cartItems.length) {
      this.modal.close();
      return;
    }

    if (count == 0) {
      this.modalBody.querySelector(`[data-product-id="${product.id}"]`).remove();
    } else {
      this.modalBody.querySelector(`[data-product-id="${product.id}"] .cart-counter__count`).innerHTML = count;
      this.modalBody.querySelector(`[data-product-id="${product.id}"] .cart-product__price`).innerHTML = '€' + (count * product.price).toFixed(2);
    }

    this.modalBody.querySelector(`.cart-buttons__info-price`).innerHTML = '€' + this.getTotalPrice().toFixed(2);
  }

  async onSubmit(event) {
    event.preventDefault();

    this.modalBody
      .querySelector('button[type="submit"]')
      .classList.add("is-loading");
    let form = this.modalBody.querySelector('.cart-form');
    let userData = new FormData(form);

    await fetch('https://httpbin.org/post', { method: 'POST', body: userData });

    this.modal.setTitle("Success!");
    this.modalBody
      .querySelector('button[type="submit"]')
      .classList.remove("is-loading");

    this.cartItems = [];
    this.cartIcon.update(this);

    this.modalBody.innerHTML = (`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
