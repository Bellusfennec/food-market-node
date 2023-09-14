import { FiPlus } from "react-icons/fi";
import Divider from "../../../common/components/divider/Divider";
import {
  Button,
  FormGroup,
  FormItem,
  IconButton,
  TextInput,
} from "../../../common/components/form";
import Modal from "../../../common/components/modal/Modal";
import Loading from "../../../common/components/loading";
import useForm from "../../../hooks/useForm";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSpecification,
  getSpecificationsLoadingStatus,
} from "../../../store/specification";

const SpecificationCreate = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getSpecificationsLoadingStatus());
  const CONFIG = { name: { isRequired: "" } };
  const FORM = { name: "" };
  const {
    handlerChange,
    form,
    handlerSubmit,
    isValid,
    name,
    placeholder,
    error,
  } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });

  function onSubmit(data) {
    dispatch(createSpecification(data))
      .unwrap()
      .then(() => setModal(false));
  }

  return (
    <FormGroup>
      <FormItem>
        <IconButton onClick={() => setModal(true)} title="Добавить">
          <FiPlus />
        </IconButton>
      </FormItem>

      <Modal open={modal} setOpen={setModal} title="Новая спецификация">
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
    </FormGroup>
  );
};

export default React.memo(SpecificationCreate);
