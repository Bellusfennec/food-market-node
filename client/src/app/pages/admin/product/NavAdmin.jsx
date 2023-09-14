import { Link } from "react-router-dom";
import style from "./NavAdmin.module.scss";

const NavAdmin = () => {
  return (
    <nav className={style.nav}>
      <Link to={`/admin/product`}>Товары</Link>
      <br />
      <Link to={`/admin/category`}>Категории</Link>
      <Link to={`/admin/specification`}>Спецификации</Link>
    </nav>
  );
};

export default NavAdmin;
