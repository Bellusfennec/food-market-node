/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../../common/components/loading";
import { getCurrentUser, getLoggedStatus } from "../../store/user";
import EditUser from "./components/EditUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import PassportLayout from "../../layouts/passport";
import ContainerCenter from "../../common/components/containerCenter";
import MainLayout from "../../layouts/main";

const PassportPage = () => {
  const { page } = useParams();
  const isLogged = useSelector(getLoggedStatus());
  const user = useSelector(getCurrentUser());

  if (isLogged && page !== "profile" && page !== "edit") {
    return <Navigate to="/" />;
  }
  if (!isLogged && page !== "registration" && page !== "login") {
    return <Navigate to="/passport/login" />;
  }

  if (isLogged && !user) {
    return (
      <PassportLayout>
        <ContainerCenter>
          <Loading />
        </ContainerCenter>
      </PassportLayout>
    );
  }

  if (isLogged && user) {
    return (
      <MainLayout>
        <ContainerCenter>
          {page === "profile" && <Profile />}
          {page === "edit" && <EditUser />}
        </ContainerCenter>
      </MainLayout>
    );
  }

  return (
    !isLogged && (
      <PassportLayout>
        <ContainerCenter>
          {page === "login" && <Login />}
          {page === "registration" && <Registration />}
        </ContainerCenter>
      </PassportLayout>
    )
  );
};

export default PassportPage;
