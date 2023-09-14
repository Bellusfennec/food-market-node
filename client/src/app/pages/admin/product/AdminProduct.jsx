import _ from "lodash";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormGroup, FormItem } from "../../../common/components/form";
import SearchInput from "../../../common/components/form/SearchInput";
import Loading from "../../../common/components/loading";
import { getProducts, getProductsLoadingStatus } from "../../../store/product";
import ProductsTable from "./ProductsTable";

const AdminProduct = () => {
  const products = useSelector(getProducts());
  const isLoading = useSelector(getProductsLoadingStatus());
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [search, setSearch] = useState("");

  /* Поиск */
  const searchRegExp = new RegExp(search);
  const searchResult = products?.filter((product) =>
    searchRegExp.test(product?.name?.toLowerCase())
  );
  /* Сортировка колонки */
  const sortedProducts = _.orderBy(searchResult, [sortBy.path], [sortBy.order]);

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
          {!isLoading && sortedProducts && (
            <SearchInput
              value={search}
              onChange={handlerSerach}
              placeholder="Serach..."
            />
          )}
        </FormItem>
        <FormItem>
          <Link to="/admin/product/create">
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
          {search && sortedProducts.length === 0 && (
            <h5 className="mt-4">Не найдено</h5>
          )}
          {sortedProducts.length > 0 && (
            <ProductsTable
              products={sortedProducts}
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

export default AdminProduct;
