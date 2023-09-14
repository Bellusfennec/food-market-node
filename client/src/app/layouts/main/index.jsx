import React from "react";
import style from "./MainLayout.module.scss";
import Footer from "../../common/components/footer";
import NavBar from "../../common/components/navBar";
import Logo from "../../common/components/logo";
import NavBarUser from "../../common/components/navBarUser";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <NavBar>
        <Logo /> <NavBarUser />
      </NavBar>
      <main className={style.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
