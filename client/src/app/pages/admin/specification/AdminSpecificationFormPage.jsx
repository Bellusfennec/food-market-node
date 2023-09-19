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
  createSpecification,
  deleteSpecification,
  getSpecificationById,
  getSpecificationsLoadingStatus,
  updateSpecification,
} from "../../../store/specification";
import style from "./AdminSpecificationFormPage.module.scss";

const AdminSpecificationFormPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getSpecificationsLoadingStatus());
  const specification = useSelector(getSpecificationById(id));
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
    if (specification) {
      dispatch(updateSpecification(data));
      navigate(`/admin/specification`);
    } else {
      dispatch(createSpecification(data));
      navigate(`/admin/specification`);
    }
  }

  function handlerRemoveSpecification(id) {
    dispatch(deleteSpecification(id));
    navigate(`/admin/specification`);
  }

  useEffect(() => {
    if (specification) {
      setForm(specification);
    }
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handlerSubmit} className={style.container}>
      <div className={style.back}>
        <IconButton
          type="button"
          onClick={() => navigate("/admin/specification")}
        >
          <IoChevronBackOutline />
        </IconButton>
      </div>
      {specification && (
        <div className={style.remove}>
          <IconButton
            type="button"
            onClick={() => handlerRemoveSpecification(form._id)}
          >
            <IoTrashOutline />
          </IconButton>
        </div>
      )}
      <h3 className={style.label}>
        {specification ? "Редактирование" : "Новый"}
      </h3>
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
        {isLoading ? <Loading /> : specification ? "Обновить" : "Создать"}
      </Button>
    </form>
  );
};

export default React.memo(AdminSpecificationFormPage);
