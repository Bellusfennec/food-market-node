import { useDispatch, useSelector } from "react-redux";
import { decreaseInBasket, increaseInBasket } from "../../../store/basket";
import { getProductById } from "../../../store/product";
import { IconButton } from "../form";
import Image from "../image";
import style from "./BasketProduct.module.scss";

const BasketProduct = (props) => {
  const dispatch = useDispatch();
  const { productId, className, productCount } = props;
  const { name, price, priceSale, image } = useSelector(
    getProductById(productId)
  );

  return (
    <div className={style.container + (className ? " " + className : "")}>
      <div className={style.product}>
        <div className={style.image}>
          <Image image={image} alt={name} />
        </div>
        <p className={style.name}>{name}</p>
      </div>
      <div className={style.basketButtons}>
        <IconButton
          onClick={() => dispatch(decreaseInBasket(productId))}
          className={style.basket}
        >
          -
        </IconButton>
        <div>{productCount}</div>
        <IconButton
          onClick={() => dispatch(increaseInBasket(productId))}
          className={style.basket}
        >
          +
        </IconButton>
      </div>
      <div>{priceSale ? priceSale : price} ₽</div>
    </div>
  );
};

export default BasketProduct;
