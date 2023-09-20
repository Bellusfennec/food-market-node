/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../common/components/container";
import WrapperBorder from "../../common/components/wrapperBorder";
import MainLayout from "../../layouts/main";
import style from "./AdminPage.module.scss";
import AdminCategoryFormPage from "./category/AdminCategoryFormPage";
import AdminCategoryPage from "./category/AdminCategoryPage";
import AdminProductFormPage from "./product/AdminProductFormPage";
import AdminProductPage from "./product/AdminProductPage";
import NavAdmin from "./product/NavAdmin";
import AdminSpecificationFormPage from "./specification/AdminSpecificationFormPage";
import AdminSpecificationPage from "./specification/AdminSpecificationPage";

const AdminPage = () => {
  const { page, action, id } = useParams();

  return (
    <MainLayout>
      <Container>
        <NavAdmin />
      </Container>
      <br />
      {page === "product" && !action && (
        <Container>
          <AdminProductPage />
        </Container>
      )}
      {page === "product" && action === "edit" && id && (
        <Container className={style.width}>
          <WrapperBorder>
            <AdminProductFormPage />
          </WrapperBorder>
        </Container>
      )}
      {page === "product" && action === "create" && (
        <Container className={style.width}>
          <WrapperBorder>
            <AdminProductFormPage />
          </WrapperBorder>
        </Container>
      )}

      {page === "category" && !action && (
        <Container>
          <AdminCategoryPage />
        </Container>
      )}
      {page === "category" && action === "edit" && id && (
        <Container className={style.width}>
          <WrapperBorder>
            <AdminCategoryFormPage />
          </WrapperBorder>
        </Container>
      )}
      {page === "category" && action === "create" && (
        <Container className={style.width}>
          <WrapperBorder>
            <AdminCategoryFormPage />
          </WrapperBorder>
        </Container>
      )}
      {page === "specification" && !action && (
        <Container>
          <AdminSpecificationPage />
        </Container>
      )}
      {page === "specification" && action === "edit" && id && (
        <Container className={style.width}>
          <WrapperBorder>
            <AdminSpecificationFormPage />
          </WrapperBorder>
        </Container>
      )}
      {page === "specification" && action === "create" && (
        <Container className={style.width}>
          <WrapperBorder>
            <AdminSpecificationFormPage />
          </WrapperBorder>
        </Container>
      )}
    </MainLayout>
  );
};

export default AdminPage;
