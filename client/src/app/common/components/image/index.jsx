import style from "./Image.module.scss";
import configFile from "../../../../config/index.json";

const Image = (props) => {
  const { image, alt, className } = props;
  return (
    <div className={style.image + (className ? " " + className : "")}>
      <img src={configFile.imageUrl + image} alt={alt} />
    </div>
  );
};

export default Image;
