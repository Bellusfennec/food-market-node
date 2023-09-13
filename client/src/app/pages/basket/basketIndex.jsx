import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../common/components/layouts";
import { deleteFormBasket, getBasket } from "../../store/basket";
import style from "./BasketIndex.module.scss";
import { IconButton } from "../../common/components/form";
import { AiOutlineDelete } from "react-icons/ai";
import BasketProduct from "../../common/components/basketProduct";

const BasketIndex = () => {
  const basket = useSelector(getBasket());
  const dispatch = useDispatch();

  return (
    <MainLayout>
      <div className={style.container}>
        <div className={style.header}>
          <h1>Ваш заказ</h1>
          <IconButton onClick={() => dispatch(deleteFormBasket())}>
            <AiOutlineDelete />
          </IconButton>
        </div>
        <div className={style.productList}>
          {basket.length > 0 &&
            basket.map((m) => <BasketProduct key={m.productId} {...m} />)}
        </div>
        <div>
          <div>Доставка</div>
          <div>Заказ на сумму</div>
          <div>
            <b>Итого</b>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BasketIndex;
