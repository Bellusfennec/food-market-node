import React from "react";
import style from "./PassportLayout.module.scss";
import Footer from "../../common/components/footer";
import NavBar from "../../common/components/navBar";
import Logo from "../../common/components/logo";

const PassportLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <NavBar>
        <Logo />
      </NavBar>
      <main className={style.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default PassportLayout;
