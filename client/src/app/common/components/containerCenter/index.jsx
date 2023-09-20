import style from "./ContainerCenter.module.scss";

const ContainerCenter = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <div className={style.main}>{children}</div>
    </div>
  );
};

export default ContainerCenter;
