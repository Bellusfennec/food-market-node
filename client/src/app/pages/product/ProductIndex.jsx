import React from "react";
import { useParams } from "react-router-dom";
import MainLayout, { ContainerLayout } from "../../common/components/layouts";
import ProductDetailPage from "./ProductDetailPage";
import ListProducts from "./components/ListProducts";
import { SectionWrapper } from "../../common/components/wrapper";

const ProductIndex = () => {
  const { page, productId } = useParams();

  return (
    <MainLayout>
      {!page && <ListProducts />}
      {page === "detail" && productId && (
        <SectionWrapper>
          <ProductDetailPage />
        </SectionWrapper>
      )}
    </MainLayout>
  );
};

export default ProductIndex;
