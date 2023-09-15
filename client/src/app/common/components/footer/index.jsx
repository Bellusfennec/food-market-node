import React from "react";
import Container from "../container";
import style from "./Footer.module.scss";

const Footer = (props) => {
  const { children, className } = props;

  return (
    <footer className={style.container}>
      <Container>
        <div className={style.main + (className ? " " + className : "")}>
          {children}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
