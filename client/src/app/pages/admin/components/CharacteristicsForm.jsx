import React from "react";
import { Button, FormGroup, FormItem } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import SpecificationCreate from "./SpecificationCreate";
import SpecificationField from "./SpecificationField";

const CharacteristicsForm = (props) => {
  const { setForm, value } = props;
  if (typeof value[0] === "string") return <Loading />;

  const handlerCreateField = () => {
    const characteristic = {
      _id: value?.length || 0,
      value: "",
      specification: "",
    };
    setForm((form) => ({
      ...form,
      characteristics: [...(form?.characteristics || []), characteristic],
    }));
  };

  const handlerRemoveField = (id) => {
    const characteristics = value.filter((item) => item._id !== id);
    setForm((form) => ({ ...form, characteristics }));
  };

  const handlerChangeData = (data) => {
    const isRepeat = value.filter((item) => item._id === data._id);
    const characteristics =
      isRepeat.length > 0
        ? value.map((item) => (item._id === data._id ? data : item))
        : [...value, data];
    setForm((form) => ({ ...form, characteristics }));
  };

  return (
    <>
      {value?.length > 0 &&
        value?.map((item) => (
          <SpecificationField
            key={item._id}
            item={item}
            setData={handlerChangeData}
            onRemove={handlerRemoveField}
          />
        ))}
      <FormGroup>
        <FormItem grow={true}>
          <Button type="button" onClick={handlerCreateField} title="Добавить">
            Добавить характеристику к товару
          </Button>
        </FormItem>
        <FormItem align="center">
          <SpecificationCreate />
        </FormItem>
      </FormGroup>
    </>
  );
};

export default React.memo(CharacteristicsForm);
