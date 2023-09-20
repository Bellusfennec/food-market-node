import style from "./WrapperBorder.module.scss";

const WrapperBorder = (props) => {
  const { children } = props;
  return <div className={style.content}>{children}</div>;
};

export default WrapperBorder;
