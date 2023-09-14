import React from "react";
import Container from "../container";
import style from "./NavBar.module.scss";

const NavBar = (props) => {
  const { children } = props;

  return (
    <header className={style.container}>
      <Container>
        <nav className={style.nav}>{children}</nav>
      </Container>
    </header>
  );
};

export default NavBar;
