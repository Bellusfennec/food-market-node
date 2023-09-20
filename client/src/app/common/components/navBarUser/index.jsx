import React from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBasketCount } from "../../../store/basket";
import { getLoggedStatus } from "../../../store/user";
import style from "./NavBarUser.module.scss";

const NavBarUser = () => {
  const isLoggedIn = useSelector(getLoggedStatus());
  const basketCount = useSelector(getBasketCount());

  return (
    <div className={style.userMenu}>
      <Link to="/basket" title="Корзина" className={style.basket}>
        <AiOutlineShoppingCart />
        {basketCount > 0 && (
          <div className={style.basketCount}>
            <span>{basketCount}</span>
          </div>
        )}
      </Link>
      <Link to="/favorite" title="Отложенные">
        <MdFavoriteBorder />
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/admin" className={style.item}>
            admin
          </Link>
          <Link to="/passport/profile" title="Профиль" className={style.user}>
            <AiOutlineUser />{" "}
            <div className={style.userArrow}>
              <IoChevronBackOutline />
            </div>
          </Link>
        </>
      ) : (
        <Link to="/passport/login">Вход</Link>
      )}
    </div>
  );
};

export default NavBarUser;
