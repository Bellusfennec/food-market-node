/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IoChevronBackOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormItem,
  IconButton,
  TextInput,
} from "../../../common/components/form";
import Loading from "../../../common/components/loading";
import useForm from "../../../hooks/useForm";
import {
  createCategory,
  deleteCategory,
  getCategoriesLoadingStatus,
  getCategoryById,
  updateCategory,
} from "../../../store/category";
import style from "./AdminCategoryFormPage.module.scss";

const AdminCategoryFormPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getCategoriesLoadingStatus());
  const category = useSelector(getCategoryById(id));
  const navigate = useNavigate();
  const CONFIG = {
    name: { isRequired: "" },
  };
  const initialForm = {
    name: "",
  };
  const FORM = initialForm;
  const {
    handlerChange,
    form,
    setForm,
    handlerSubmit,
    isValid,
    placeholder,
    name,
    error,
    handlerBlur,
  } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });

  function onSubmit(data) {
    if (category) {
      dispatch(updateCategory(data));
      navigate(`/admin/category`);
    } else {
      dispatch(createCategory(data));
      navigate(`/admin/category`);
    }
  }

  function handlerRemoveCategory(id) {
    dispatch(deleteCategory(id));
    navigate(`/admin/category`);
  }

  useEffect(() => {
    if (category) {
      setForm(category);
    }
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handlerSubmit} className={style.container}>
      <div className={style.back}>
        <IconButton type="button" onClick={() => navigate("/admin/category")}>
          <IoChevronBackOutline />
        </IconButton>
      </div>
      {category && (
        <div className={style.remove}>
          <IconButton
            type="button"
            onClick={() => handlerRemoveCategory(form._id)}
          >
            <IoTrashOutline />
          </IconButton>
        </div>
      )}
      <h3 className={style.label}>{category ? "Редактирование" : "Новый"}</h3>
      <br />
      <br />
      <FormGroup>
        <FormItem grow="1">
          <TextInput
            name={name.name}
            value={form.name}
            error={error.name}
            placeholder={placeholder.name}
            onChange={handlerChange}
            onBlur={handlerBlur}
          />
        </FormItem>
      </FormGroup>
      <br />
      <Button disabled={!isValid}>
        {isLoading ? <Loading /> : category ? "Обновить" : "Создать"}
      </Button>
    </form>
  );
};

export default React.memo(AdminCategoryFormPage);
