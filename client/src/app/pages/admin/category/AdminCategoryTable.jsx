import React from "react";
import Table from "../../../common/components/table";
import TableHeader from "../../../common/components/table/TableHeader";
import TableBody from "../../../common/components/table/TableBody";
import { useNavigate } from "react-router-dom";
import { displayDate } from "../../../utils/dispalyDate";

const AdminCategoryTable = (props) => {
  const { sorted, onDeleteProduct, onSort, selectedSort } = props;
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
      component: (sorted) => {
        return <p>{displayDate(sorted.createdAt)}</p>;
      },
    },
    edit: {
      component: (sorted) => (
        <button
          className="btn btn-danger"
          onClick={() => navigate(`/admin/category/edit/${sorted._id}`)}
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

export default AdminCategoryTable;
