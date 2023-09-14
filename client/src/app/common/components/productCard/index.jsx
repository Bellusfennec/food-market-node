import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToBasket,
  decreaseInBasket,
  getBasketById,
  increaseInBasket,
} from "../../../store/basket";
import FavoriteToggle from "../favoriteToggle";
import Button from "../form/Button";
import Image from "../image";
import style from "./ProductCard.module.scss";

const ProductCard = (props) => {
  const { image, name, link, _id, price, priceSale } = props;
  const dispatch = useDispatch();
  const inBasket = useSelector(getBasketById(_id));
  const percentDiscount = ((100 * (priceSale - price)) / price).toFixed(0);

  return (
    <div className={style.item}>
      <Image alt={name} image={image} link={link} />
      <div className={style.main}>
        <Link to={link} className={style.label}>
          <h3>{name}</h3>
        </Link>
        {priceSale && (
          <div className={style.sale}>Скидка {percentDiscount}%</div>
        )}
        <FavoriteToggle id={_id} className={style.favorite} />
        <div className={style.footer}>
          <div className={style.price}>
            {!priceSale && <div className={style.regular}>{price} ₽</div>}
            {priceSale && (
              <>
                <div className={style.discount}>
                  <span>{price} ₽</span>
                </div>
                <div className={style.regular}>{priceSale} ₽</div>
              </>
            )}
          </div>
          {!inBasket && (
            <Button onClick={() => dispatch(addToBasket(_id))}>
              В корзину
            </Button>
          )}
          {inBasket && (
            <div className={style.basketButtons}>
              <Button onClick={() => dispatch(decreaseInBasket(_id))}>-</Button>
              <div>{inBasket.productCount}</div>
              <Button onClick={() => dispatch(increaseInBasket(_id))}>+</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
