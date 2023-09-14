/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../common/components/container";
import MainLayout from "../../layouts/main";
import AdminProduct from "./product/AdminProduct";
import AdminProductForm from "./product/AdminProductForm";
import NavAdmin from "./product/NavAdmin";

const AdminIndex = () => {
  const { page, action, id } = useParams();

  return (
    <MainLayout>
      <Container>
        <NavAdmin />
      </Container>
      <br />
      {page === "product" && action === "edit" && id && (
        <Container>
          <AdminProductForm />
        </Container>
      )}
      {page === "product" && action === "create" && (
        <Container>
          <AdminProductForm />
        </Container>
      )}
      {page === "product" && !action && (
        <Container>
          <AdminProduct />
        </Container>
      )}
    </MainLayout>
  );
};

export default AdminIndex;
