import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, getProductsLoadingStatus } from "../../store/product";
import Loading from "../../common/components/loading";
import ProductDetail from "../../common/components/productDetail/index";
import { useDispatch } from "../../../../node_modules/react-redux/es/exports";
import {
  getCharacteristics,
  getCharacteristicsLoadingStatus,
} from "../../store/characteristic";
import {
  addToBasket,
  decreaseInBasket,
  getBasketById,
  increaseInBasket,
} from "../../store/basket";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(getProductById(productId));
  const isLoadingProducts = useSelector(getProductsLoadingStatus());
  const isLoadingCharacteristics = useSelector(
    getCharacteristicsLoadingStatus()
  );
  const [characteristics, setCharacteristics] = useState([]);
  const inBasket = useSelector(getBasketById(productId));

  useEffect(() => {
    if (product && characteristics.length === 0) {
      dispatch(getCharacteristics(product.characteristics))
        .unwrap()
        .then((result) => {
          setCharacteristics(result);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, product]);

  const handlerAddToBasket = (id) => dispatch(addToBasket(id));
  const handlerIncreaseInBasket = (id) => dispatch(increaseInBasket(id));
  const handlerDecreaseInBasket = (id) => dispatch(decreaseInBasket(id));

  if (isLoadingProducts || isLoadingCharacteristics) return <Loading />;

  return (
    <ProductDetail
      {...product}
      characteristicsList={characteristics}
      addToBasket={handlerAddToBasket}
      increaseInBasket={handlerIncreaseInBasket}
      decreaseInBasket={handlerDecreaseInBasket}
      inBasket={inBasket}
    />
  );
};

export default ProductDetailPage;
