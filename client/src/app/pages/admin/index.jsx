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

const AdminPage = () => {
  const { page, action, id } = useParams();

  return (
    <MainLayout>
      <Container>
        <NavAdmin />
      </Container>
      <br />

      {page === "product" && action === "edit" && id && (
        <Container>
          <AdminProductFormPage />
        </Container>
      )}
      {page === "product" && action === "create" && (
        <Container>
          <AdminProductFormPage />
        </Container>
      )}
      {page === "product" && !action && (
        <Container>
          <AdminProductPage />
        </Container>
      )}
      {page === "category" && !action && (
        <Container>
          <AdminCategoryPage />
        </Container>
      )}
      {page === "specification" && !action && (
        <Container>
          <AdminSpecificationPage />
        </Container>
      )}
    </MainLayout>
  );
};

export default AdminPage;
