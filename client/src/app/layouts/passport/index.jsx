import React from "react";
import style from "./PassportLayout.module.scss";
import Footer from "../../common/components/footer";
import NavBar from "../../common/components/navBar";
import Logo from "../../common/components/logo";
import FooterSocial from "../../common/components/footerSocial";

const PassportLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <NavBar className={style.header}>
        <Logo />
      </NavBar>
      <main className={style.main}>{children}</main>
      <Footer className={style.footer}>
        <FooterSocial />
      </Footer>
    </div>
  );
};

export default PassportLayout;
