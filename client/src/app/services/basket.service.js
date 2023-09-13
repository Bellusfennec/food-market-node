const BASKET = "basket";

const basketService = {
  set: (payload) => {
    return localStorage.setItem(BASKET, JSON.stringify(payload));
  },
  get: () => {
    return JSON.parse(localStorage.getItem(BASKET));
  },
  delete: () => {
    localStorage.removeItem(BASKET);
  },
};

export default basketService;
