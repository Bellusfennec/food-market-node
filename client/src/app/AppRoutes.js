import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import PassportPage from "./pages/passport";
import ProductPage from "./pages/product";
import PassportLoggedOutPage from "./pages/logout";
import BasketPage from "./pages/basket";
import FavoritePage from "./pages/favorite";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="passport/:page?" element={<PassportPage />} />
      <Route path="logout" element={<PassportLoggedOutPage />} />
      <Route path="product/:page?/:productId?" element={<ProductPage />} />
      <Route path="basket/:page?" element={<BasketPage />} />
      <Route path="favorite" element={<FavoritePage />} />
      <Route path="admin/:page?/:action?/:id?" element={<AdminPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
