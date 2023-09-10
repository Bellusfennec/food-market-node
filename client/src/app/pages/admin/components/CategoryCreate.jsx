import React, { useState } from "react";
import useForm from "../../../hooks/useForm";
import { Button, IconButton, TextInput } from "../../../common/components/form";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../common/components/modal/Modal";
import Divider from "../../../common/components/divider/Divider";
import { Loading } from "../../../common/components/loading";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategoriesLoadingStatus,
} from "../../../store/category";

const CategoryCreate = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getCategoriesLoadingStatus());
  const CONFIG = { name: { isRequired: "" } };
  const FORM = { name: "" };
  const {
    handlerChange,
    form,
    handlerSubmit,
    placeholder,
    name,
    error,
    isValid,
  } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });

  function onSubmit(data) {
    dispatch(createCategory(data))
      .unwrap()
      .then(() => setModal(false));
  }

  return (
    <>
      <IconButton onClick={() => setModal(true)} title="Добавить">
        <FiPlus />
      </IconButton>
      <Modal open={modal} setOpen={setModal} title="Новая категория">
        <Divider />
        <TextInput
          name={name.name}
          value={form.name}
          error={error.name}
          placeholder={placeholder.name}
          onChange={handlerChange}
        />
        <Divider row="2" />
        <Button onClick={handlerSubmit} disabled={!isValid}>
          {isLoading ? <Loading /> : "Создать"}
        </Button>
      </Modal>
    </>
  );
};

export default React.memo(CategoryCreate);
