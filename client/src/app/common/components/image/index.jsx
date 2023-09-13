import style from "./Image.module.scss";

const Image = (props) => {
  const { image, alt, className } = props;
  return (
    <div className={style.image + (className ? " " + className : "")}>
      <img src={process.env.REACT_APP_IMAGE_URL + image} alt={alt} />
    </div>
  );
};

export default Image;
