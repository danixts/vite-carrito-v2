class State {
  cart = {};
  KEY = "cart";
  static instance;
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new State();
    return this.instance;
  }

  get cartObject() {
    return Object.values(this.cart);
  }

  constructor() {
    const key = localStorage.getItem(this.KEY);
    if (key) {
      this.cart = JSON.parse(localStorage.getItem(this.KEY));
    }
  }

  add(product) {
    const { id } = product;
    if (this.cart.hasOwnProperty(id)) {
      product.qty = this.cart[id].qty + 1;
    }
    this.cart[id] = product;
    console.log(product);
  }

  remove() {}
  increment(id) {
    const product = this.cart[id];
    product.qty++;
    this.cart[id] = { ...product };
  }
  decrement(id) {
    const product = this.cart[id];
    product.qty--;
    if (product.qty !== 0) {
      this.cart[id] = { ...product };
    } else {
      delete this.cart[id];
    }
  }
  total() {
    const qtyTotal = this.cartObject.reduce((acc, { qty }) => acc + qty, 0);
    const total = this.cartObject.reduce(
      (acc, { qty, price }) => acc + qty * price,
      0
    );
    return [qtyTotal, total];
  }

  saveLocalStorage() {
    localStorage.setItem(this.KEY, JSON.stringify(this.cart));
  }
}

export default State.getInstance();
