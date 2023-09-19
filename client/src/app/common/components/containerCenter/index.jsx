import style from "./ContainerCenter.module.scss";

const ContainerCenter = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <div className={style.center}>
        <div className={style.block}>{children}</div>
      </div>
    </div>
  );
};

export default ContainerCenter;
