import Component from "../js/Component";
import Data from "../js/Data";
import cart from "../js/State";

export class Product extends Component {
  constructor() {
    super("template-product", "app-product");
    this.Cart = new Cart();
    this.event();
  }
  render() {
    Data.forEach((product) => {
      const { id, name, url, price } = product;
      this.template.querySelector("img").src = url;
      this.template.querySelector("span").textContent = name;
      this.template.querySelector("strong").textContent = price;
      this.template.querySelector("button").dataset.id = id;
      const clone = this.template.cloneNode(true);
      this.fragment.appendChild(clone);
    });
    this.root.appendChild(this.fragment);
  }

  event() {
    document.addEventListener("DOMContentLoaded", () => {
      this.render();
    });

    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-buy")) {
        this.createDataCart(e.target.parentNode);
        this.Cart.render();
      }
    });
  }

  createDataCart(node) {
    const id = node.querySelector("button").dataset.id;
    const price = node.querySelector("strong").textContent;
    const name = node.querySelector("span").textContent;

    const product = { id, price: +price, name, qty: 1 };

    cart.add(product);
  }
}

export class Cart extends Component {
  constructor() {
    super("template-cart-list", "app-cart-list");
    this.Total = new Total();
    this.render();
    this.event();
  }

  render() {
    console.log(cart.cartObject);
    this.root.innerHTML = "";
    cart.cartObject.forEach((product) => {
      const { id, name, price, qty } = product;
      this.template.querySelector(".text-id").textContent = id;
      this.template.querySelector(".text-name").textContent = name;
      this.template.querySelector(".btn-minus").dataset.id = id;
      this.template.querySelector(".btn-plus").dataset.id = id;
      this.template.querySelector(".text-qty").textContent = qty;
      this.template.querySelector(".text-total").textContent = price * qty;
      const clone = this.template.cloneNode(true);
      this.fragment.appendChild(clone);
    });
    this.root.appendChild(this.fragment);
    this.Total.render();
    cart.saveLocalStorage();
  }

  event() {
    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-plus")) {
        const id = e.target.dataset.id;
        cart.increment(id);
        this.render();
      }
      if (e.target.classList.contains("btn-minus")) {
        const id = e.target.dataset.id;
        cart.decrement(id);
        this.render();
      }
    });
  }
}

export class Total extends Component {
  constructor() {
    super("template-cart-total", "app-cart-total");
    this.render();
  }
  render() {
    this.root.innerHTML = "";
    const [qtyTotal, total] = cart.total();
    this.template.querySelector(".text-qty").textContent = qtyTotal;
    this.template.querySelector(".text-total").textContent = total;
    const clone = this.template.cloneNode(true);
    this.fragment.appendChild(clone);
    this.root.appendChild(this.fragment);
  }
}
