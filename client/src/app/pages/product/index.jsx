import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../common/components/container";
import MainLayout from "../../layouts/main";
import ProductDetailPage from "./ProductDetailPage";
import ListProducts from "./components/ListProducts";

const ProductPage = () => {
  const { page, productId } = useParams();

  return (
    <MainLayout>
      {!page && <ListProducts />}
      {page === "detail" && productId && (
        <Container>
          <ProductDetailPage />
        </Container>
      )}
    </MainLayout>
  );
};

export default ProductPage;
