import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../common/components/table";
import TableBody from "../../../common/components/table/TableBody";
import TableHeader from "../../../common/components/table/TableHeader";

const AdminSpecificationTable = ({
  sorted,
  onDeleteProduct,
  onSort,
  selectedSort,
}) => {
  const navigate = useNavigate();
  const columns = {
    title: {
      path: "name",
      name: "Название",
      component: (sorted) => <p>{sorted.name}</p>,
    },
    characteristics: {
      path: "createdAt",
      name: "Дата создания",
      component: (sorted) => <p>{sorted.createdAt}</p>,
    },
    edit: {
      component: (sorted) => (
        <button
          className="btn btn-danger"
          onClick={() => navigate(`/admin/specification/edit/${sorted._id}`)}
        >
          Редактировать
        </button>
      ),
    },
  };

  return (
    <Table {...{ onSort, selectedSort, columns, data: sorted }}>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: sorted }} />
    </Table>
  );
};

export default AdminSpecificationTable;
