/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../../common/components/loading";
import { getCurrentUser, getLoggedStatus } from "../../store/user";
import style from "./PassportIndex.module.scss";
import EditUser from "./components/EditUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import PassportLayout from "../../layouts/passport";

const PassportIndex = () => {
  const { page } = useParams();
  const isLogged = useSelector(getLoggedStatus());
  const user = useSelector(getCurrentUser());

  if (isLogged && page !== "profile" && page !== "edit") {
    return <Navigate to="/" />;
  }
  if (!isLogged && page !== "registration" && page !== "login") {
    return <Navigate to="/passport/login" />;
  }

  return (
    <PassportLayout>
      <div className={style.container}>
        <div className={style.main}>
          {isLogged && !user && <Loading />}
          {isLogged && user && page === "profile" && <Profile />}
          {isLogged && user && page === "edit" && <EditUser />}
          {!isLogged && page === "login" && <Login />}
          {!isLogged && page === "registration" && <Registration />}
        </div>
      </div>
    </PassportLayout>
  );
};

export default PassportIndex;
