const FAVORITE = "favorite";

const favoriteService = {
  set: (payload) => {
    return localStorage.setItem(FAVORITE, JSON.stringify(payload));
  },
  get: () => {
    return JSON.parse(localStorage.getItem(FAVORITE));
  },
  delete: () => {
    localStorage.removeItem(FAVORITE);
  },
};

export default favoriteService;
