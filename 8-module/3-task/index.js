export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    if (productId && amount) {
      for (let i = 0; i < this.cartItems.length; i++) {
        const item = this.cartItems[i];
        if (item.product.id === productId) {
          if (item.count + amount === 0) {
            item.count = 0;
            // this.cartItems = []
            this.cartItems = this.cartItems.splice(i, 0);
          } else {
            item.count += amount;
          }
        }
        this.onProductUpdate(item);
      }
    }
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
