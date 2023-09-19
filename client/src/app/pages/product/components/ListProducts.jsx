import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import List from "../../../common/components/card/List";
import Container from "../../../common/components/container";
import Loading from "../../../common/components/loading";
import ProductCard from "../../../common/components/productCard";
import {
  getCategories,
  getCategoriesLoadingStatus,
} from "../../../store/category";
import { getProducts, getProductsLoadingStatus } from "../../../store/product";
import style from "./ListProducts.module.scss";

const ListProducts = () => {
  const products = useSelector(getProducts());
  const isLoadingProducts = useSelector(getProductsLoadingStatus());
  const categories = useSelector(getCategories());
  const isLoadingCategories = useSelector(getCategoriesLoadingStatus());
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      const list = categories.map((category) => {
        const filteredProducts = products.filter(
          (product) => product.category === category._id
        );
        const productsList = filteredProducts ? filteredProducts : [];
        return { ...category, products: productsList };
      });
      setCategoriesList(list);
    }
  }, [products, categories]);

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      {categoriesList.length > 0 &&
        categoriesList.map(
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
