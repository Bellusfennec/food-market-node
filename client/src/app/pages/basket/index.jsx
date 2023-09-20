import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasketProduct from "../../common/components/basketProduct";
import Container from "../../common/components/container";
import { Button, IconButton } from "../../common/components/form";
import Loading from "../../common/components/loading";
import WrapperBorder from "../../common/components/wrapperBorder";
import MainLayout from "../../layouts/main";
import {
  deleteBasket,
  getBasket,
  getBasketLoadingStatus,
  getBasketSum,
} from "../../store/basket";
import { getProducts } from "../../store/product";
import style from "./BasketPage.module.scss";

const BasketPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector(getBasket());
  const isLoadingBasket = useSelector(getBasketLoadingStatus());
  const product = useSelector(getProducts());
  const basketSum = useSelector(getBasketSum());
  const priceDelivery = 129;
  const result = basketSum + priceDelivery;

  if (product.length === 0) {
    return (
      <MainLayout>
        <Container>
          <Loading />
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {basket.length === 0 && (
        <Container className={style.width}>
          <WrapperBorder>
            <div className={style.empty}>
              <p>В вашей корзине ничего нет.</p>
              <br />
              <Button onClick={() => navigate("/")}>К ассортименту</Button>
            </div>
          </WrapperBorder>
        </Container>
      )}

      {basket.length > 0 && (
        <Container className={style.width}>
          <WrapperBorder>
            <div className={style.header}>
              <h1>Ваш заказ</h1>
              <IconButton onClick={() => dispatch(deleteBasket())}>
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
                <p>{isLoadingBasket ? <Loading /> : `${basketSum} ₽`}</p>
              </div>
              <div className={style.result}>
                <p>Итого</p>
                <p>{isLoadingBasket ? <Loading /> : `${result} ₽`}</p>
              </div>
            </div>
          </WrapperBorder>
        </Container>
      )}
    </MainLayout>
  );
};

export default BasketPage;
