import React from "react";
import style from "./Container.module.scss";

const Container = (props) => {
  const { children } = props;
  const className = props.className ? " " + props.className : "";
  return <div className={style.wrapper + className}>{children}</div>;
};

export default Container;
