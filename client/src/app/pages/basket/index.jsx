import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasketProduct from "../../common/components/basketProduct";
import { Button, IconButton } from "../../common/components/form";
import MainLayout from "../../layouts/main";
import { deleteFormBasket, getBasket, getBasketSum } from "../../store/basket";
import style from "./BasketPage.module.scss";

const BasketPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector(getBasket());
  const basketSum = useSelector(getBasketSum());
  const priceDelivery = 129;
  const result = basketSum + priceDelivery;

  return (
    <MainLayout>
      <div className={style.container}>
        {basket.length === 0 && (
          <div className={style.notFound}>
            <p>В вашей корзине ничего нет.</p>
            <br />
            <Button onClick={() => navigate("/")}>К ассортименту</Button>
          </div>
        )}
        {basket.length > 0 && (
          <>
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
            <div className={style.containerResult}>
              <div>
                <p>Доставка</p>
                <p>{priceDelivery} ₽</p>
              </div>
              <div>
                <p>Заказ на сумму</p>
                <p>{basketSum} ₽</p>
              </div>
              <div className={style.result}>
                <p>Итого</p>
                <p>{result} ₽</p>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BasketPage;
