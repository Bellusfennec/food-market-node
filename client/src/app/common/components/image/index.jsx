import style from "./Image.module.scss";
import configFile from "../../../../config/index.json";
import { Link } from "react-router-dom";

const Image = (props) => {
  const { image, alt, className, link } = props;

  if (link) {
    return (
      <Link
        to={link}
        className={style.image + (className ? " " + className : "")}
      >
        <img src={configFile.imageUrl + image} alt={alt} />
      </Link>
    );
  }

  return (
    <div className={style.image + (className ? " " + className : "")}>
      <img src={configFile.imageUrl + image} alt={alt} />
    </div>
  );
};

export default Image;
