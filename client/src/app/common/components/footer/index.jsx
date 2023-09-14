import React from "react";
import { SlSocialInstagram, SlSocialVkontakte } from "react-icons/sl";
import { TbBrandTelegram } from "react-icons/tb";
import { Link } from "react-router-dom";
import Container from "../container";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.container}>
      <Container>
        <div className={style.main}>
          <div>
            <Link to="/">Food Market</Link>
          </div>
          <div>
            <div className={style.social}>
              <Link to="/" title="Vkontakte" className={style.vkontakte}>
                <SlSocialVkontakte />
              </Link>
              <Link to="/" title="Instagram" className={style.instagram}>
                <SlSocialInstagram />
              </Link>
              <Link to="/" title="Telegram">
                <TbBrandTelegram />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
