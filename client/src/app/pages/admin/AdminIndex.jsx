/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import Divider from "../../common/components/divider/Divider";
import MainLayout from "../../layouts/main";
import { SectionWrapper } from "../../common/components/wrapper";
import AdminProduct from "./AdminProduct";
import AdminProductForm from "./AdminProductForm";
import NavAdmin from "./components/NavAdmin";
import Container from "../../common/components/container";

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
