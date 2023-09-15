import { SlSocialInstagram, SlSocialVkontakte } from "react-icons/sl";
import { TbBrandTelegram } from "react-icons/tb";
import { Link } from "react-router-dom";
import style from "./FooterSocial.module.scss";

const FooterSocial = () => {
  return (
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
  );
};

export default FooterSocial;
