import React from "react";
import { useSelector } from "react-redux";
import List from "../../../common/components/card/List";
import Container from "../../../common/components/container";
import Loading from "../../../common/components/loading";
import ProductCard from "../../../common/components/productCard";
import { getCategories } from "../../../store/category";
import { getProducts, getProductsLoadingStatus } from "../../../store/product";
import style from "./ListProducts.module.scss";

const ListProducts = () => {
  const products = useSelector(getProducts());
  const isLoadingProducts = useSelector(getProductsLoadingStatus());
  const categories = useSelector(getCategories());

  const categoriesListProducts = (data) => {
    return [...data].map((category) => {
      const filtredProducts = products.filter(
        (product) => product.category === category._id
      );
      const productsList = filtredProducts ? filtredProducts : [];
      return { ...category, products: productsList };
    });
  };

  return (
    <Container>
      {isLoadingProducts && (
        <>
          <Loading />
        </>
      )}
      {!isLoadingProducts &&
        categories?.length > 0 &&
        categoriesListProducts(categories).map(
          ({ name, _id, products }, i) =>
            products?.length > 0 && (
              <div key={_id} className={style.container}>
                <h3 className={style.title}>{name}</h3>
                <List>
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      {...product}
                      link={`/product/detail/${product._id}`}
                    />
                  ))}
                </List>
              </div>
            )
        )}
    </Container>
  );
};

export default ListProducts;
