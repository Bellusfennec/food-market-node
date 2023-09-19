import _ from "lodash";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormGroup, FormItem } from "../../../common/components/form";
import SearchInput from "../../../common/components/form/SearchInput";
import Loading from "../../../common/components/loading";
import { getCategories } from "../../../store/category";
import { getProductsLoadingStatus } from "../../../store/product";
import AdminCategoryTable from "./AdminCategoryTable";

const AdminCategoryPage = () => {
  const categories = useSelector(getCategories());
  const isLoading = useSelector(getProductsLoadingStatus());
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [search, setSearch] = useState("");

  /* Поиск */
  const searchRegExp = new RegExp(search);
  const searchResult = categories?.filter((f) =>
    searchRegExp.test(f?.name?.toLowerCase())
  );
  /* Сортировка колонки */
  const sorted = _.orderBy(searchResult, [sortBy.path], [sortBy.order]);

  const handlerDelete = (id) => {
    // setUsers((prev) => prev.filter((user) => user._id !== userId));
    console.log(id);
  };

  const handlerSort = (item) => {
    setSortBy(item);
  };

  const handlerSerach = ({ target }) => {
    setSearch(target.value.toLowerCase());
  };

  return (
    <>
      <FormGroup>
        <FormItem grow={true}>
          {!isLoading && sorted && (
            <SearchInput
              value={search}
              onChange={handlerSerach}
              placeholder="Serach..."
            />
          )}
        </FormItem>
        <FormItem>
          <Link to="/admin/category/create">
            <FiPlus />
          </Link>
        </FormItem>
      </FormGroup>
      <br />
      {isLoading && (
        <>
          <Loading />
        </>
      )}
      {!isLoading && (
        <>
          {search && sorted.length === 0 && (
            <h5 className="mt-4">Не найдено</h5>
          )}
          {sorted.length > 0 && (
            <AdminCategoryTable
              sorted={sorted}
              onDeleteProduct={handlerDelete}
              onSort={handlerSort}
              selectedSort={sortBy}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminCategoryPage;
