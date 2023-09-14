import React from "react";
import style from "./ContainerWrapper.module.scss";

const ContainerWrapper = (props) => {
  const { children } = props;
  // const className = props.className ? " " + props.className : "";
  return (
    <div className={style.container}>
      <div className={style.containerBody}>{children}</div>
    </div>
  );
};

export default ContainerWrapper;
