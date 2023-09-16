/* eslint-disable no-unused-vars */
import React from "react";
import ListProducts from "../product/components/ListProducts";
import MainLayout from "../../layouts/main";

const HomePage = () => {
  return (
    <MainLayout>
      <ListProducts />
    </MainLayout>
  );
};

export default HomePage;
