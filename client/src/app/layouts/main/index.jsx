import React from "react";
import style from "./MainLayout.module.scss";
import Footer from "../../common/components/footer";
import NavBar from "../../common/components/navBar";
import Logo from "../../common/components/logo";
import NavBarUser from "../../common/components/navBarUser";
import FooterSocial from "../../common/components/footerSocial";
import { Link } from "react-router-dom";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <NavBar className={style.header}>
        <Logo /> <NavBarUser />
      </NavBar>
      <main className={style.main}>{children}</main>
      <Footer className={style.footer}>
        <div>
          <Link to="/">Food Market</Link>
        </div>
        <FooterSocial />
      </Footer>
    </div>
  );
};

export default MainLayout;
