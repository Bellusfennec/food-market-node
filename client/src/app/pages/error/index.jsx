import React from "react";
import { Link, useParams } from "react-router-dom";
import Divider from "../../common/components/divider/Divider";
import ErrorLayout from "../../layouts/error/Error";

const ErrorPage = () => {
  console.log(useParams());

  return (
    <ErrorLayout>
      <div>Страница не найдена!</div>
      <Divider row="2" />
      <div>
        <Link to="/">Назад</Link>
      </div>
    </ErrorLayout>
  );
};

export default ErrorPage;
