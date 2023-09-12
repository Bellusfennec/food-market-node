import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, getProductsLoadingStatus } from "../../store/product";
import Loading from "../../common/components/loading";
import ProductDetail from "../../common/components/productDetail/index";
import { useDispatch } from "../../../../node_modules/react-redux/es/exports";
import { getCharacteristics } from "../../store/characteristic";
import { addToBasket } from "../../store/basket";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(getProductById(productId));
  const isLoading = useSelector(getProductsLoadingStatus());
  const [characteristics, setCharacteristics] = useState([]);

  useEffect(() => {
    if (product) {
      dispatch(getCharacteristics(product.characteristics))
        .unwrap()
        .then((result) => {
          setCharacteristics(result);
        });
    }
  }, [productId]);

  const handlerAddToBasket = (id) => {
    dispatch(addToBasket(id));
  };

  if (isLoading) return <Loading />;

  return (
    <ProductDetail
      {...product}
      characteristics={characteristics}
      addToBasket={handlerAddToBasket}
    />
  );
};

export default ProductDetailPage;
