import React from "react";
import Table from "../../../common/components/table";
import TableHeader from "../../../common/components/table/TableHeader";
import TableBody from "../../../common/components/table/TableBody";
import { useNavigate } from "react-router-dom";
import { fullDate } from "../../../utils/date";
import { Button } from "../../../common/components/form";

const AdminCategoryTable = (props) => {
  const { sorted, onSort, selectedSort } = props;
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
      component: (sorted) => <p>{fullDate(sorted.createdAt)}</p>,
    },
    edit: {
      component: (sorted) => (
        <Button
          className="btn btn-danger"
          onClick={() => navigate(`/admin/category/edit/${sorted._id}`)}
        >
          Редактировать
        </Button>
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
