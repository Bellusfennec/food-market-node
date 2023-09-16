/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../common/components/container";
import MainLayout from "../../layouts/main";
import AdminProductPage from "./product/AdminProductPage";
import AdminProductFormPage from "./product/AdminProductFormPage";
import NavAdmin from "./product/NavAdmin";
import AdminSpecificationPage from "./specification/AdminSpecificationPage";
import AdminCategoryPage from "./category/AdminCategoryPage";
import AdminSpecificationFormPage from "./specification/AdminSpecificationFormPage";
import AdminCategoryFormPage from "./category/AdminCategoryFormPage";
import ContainerCenter from "../../common/components/containerCenter";

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
        <ContainerCenter>
          <AdminProductFormPage />
        </ContainerCenter>
      )}
      {page === "product" && action === "create" && (
        <ContainerCenter>
          <AdminProductFormPage />
        </ContainerCenter>
      )}

      {page === "category" && !action && (
        <Container>
          <AdminCategoryPage />
        </Container>
      )}
      {page === "category" && action === "edit" && id && (
        <ContainerCenter>
          <AdminCategoryFormPage />
        </ContainerCenter>
      )}
      {page === "category" && action === "create" && (
        <ContainerCenter>
          <AdminCategoryFormPage />
        </ContainerCenter>
      )}
      {page === "specification" && !action && (
        <Container>
          <AdminSpecificationPage />
        </Container>
      )}
      {page === "specification" && action === "edit" && id && (
        <ContainerCenter>
          <AdminSpecificationFormPage />
        </ContainerCenter>
      )}
      {page === "specification" && action === "create" && (
        <ContainerCenter>
          <AdminSpecificationFormPage />
        </ContainerCenter>
      )}
    </MainLayout>
  );
};

export default AdminPage;
