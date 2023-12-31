import React from "react";
import Table from "../../../common/components/table";
import TableHeader from "../../../common/components/table/TableHeader";
import TableBody from "../../../common/components/table/TableBody";
import { Link, useNavigate } from "react-router-dom";
import CategoryName from "../../../common/components/categoryName";
import { Button } from "../../../common/components/form";

const ProductsTable = (props) => {
  const { products, onSort, selectedSort } = props;
  const navigate = useNavigate();
  const columns = {
    title: {
      path: "name",
      name: "Название",
      component: (product) => (
        <Link to={`/product/detail/${product._id}`}>{product.name}</Link>
      ),
    },
    category: {
      path: "category",
      name: "Категория",
      component: (product) => <CategoryName id={product.category} />,
    },
    characteristics: {
      path: "characteristics",
      name: "Кол-во характеристик",
      component: (product) => <p>{product.characteristics.length}</p>,
    },
    edit: {
      component: (product) => (
        <Button
          className="btn btn-danger"
          onClick={() => navigate(`/admin/product/edit/${product._id}`)}
        >
          Редактировать
        </Button>
      ),
    },
  };

  return (
    <Table {...{ onSort, selectedSort, columns, data: products }}>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: products }} />
    </Table>
  );
};

export default ProductsTable;
