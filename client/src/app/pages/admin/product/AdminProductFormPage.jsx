/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IoChevronBackOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dropdown,
  FormGroup,
  FormItem,
  IconButton,
  TextInput,
  TextareaField,
} from "../../../common/components/form";
import ImageField from "../../../common/components/form/ImageField";
import Loading from "../../../common/components/loading";
import useForm from "../../../hooks/useForm";
import { getCategories } from "../../../store/category";
import { getCharacteristics } from "../../../store/characteristic";
import {
  createProduct,
  getProductById,
  getProductsLoadingStatus,
  removedProduct,
  updateProduct,
} from "../../../store/product";
import style from "./AdminProductForm.module.scss";
import CategoryCreate from "./CategoryCreate";
import CharacteristicsForm from "./CharacteristicsForm";

const AdminProductFormPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const isLoading = useSelector(getProductsLoadingStatus());
  const product = useSelector(getProductById(id));
  const navigate = useNavigate();
  const CONFIG = {
    name: { isRequired: "" },
    category: { isRequired: "" },
    price: { isRequired: "" },
  };
  const initialForm = {
    name: "",
    category: "",
    description: "",
    characteristics: [],
    price: "",
    priceSale: "",
    image: "1.jpg",
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
    if (product) {
      dispatch(updateProduct(data));
      navigate(`/admin/product`);
    } else {
      dispatch(createProduct(data));
      navigate(`/admin/product`);
    }
  }

  function handlerRemoveProduct(id) {
    dispatch(removedProduct(id));
    navigate(`/admin/product`);
  }

  useEffect(() => {
    if (product) {
      setForm(product);
      dispatch(getCharacteristics(product.characteristics))
        .unwrap()
        .then((result) => {
          setForm((prevState) => ({
            ...prevState,
            characteristics: result,
          }));
        });
    }
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handlerSubmit} className={style.container}>
      <div className={style.back}>
        <IconButton type="button" onClick={() => navigate("/admin/product")}>
          <IoChevronBackOutline />
        </IconButton>
      </div>
      {product && (
        <div className={style.remove}>
          <IconButton
            type="button"
            onClick={() => handlerRemoveProduct(form._id)}
          >
            <IoTrashOutline />
          </IconButton>
        </div>
      )}
      <h3 className={style.label}>{product ? "Редактирование" : "Новый"}</h3>
      <br />
      <br />
      <FormGroup>
        <FormItem grow="1">
          <ImageField
            name={name.image}
            value={form.image}
            error={error.image}
            onChange={handlerChange}
            onBlur={handlerBlur}
          />
        </FormItem>
      </FormGroup>
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
      <TextareaField
        name={name.description}
        value={form.description}
        error={error.description}
        placeholder={placeholder.description}
        onChange={handlerChange}
        onBlur={handlerBlur}
      />
      <br />
      <FormGroup>
        <FormItem grow="1">
          <Dropdown
            name={name.category}
            value={form.category}
            error={error.category}
            placeholder={placeholder.category}
            options={categories}
            setForm={setForm}
            onChange={handlerChange}
            onBlur={handlerBlur}
          />
        </FormItem>
        <FormItem align="center">
          <CategoryCreate />
        </FormItem>
      </FormGroup>
      <br />
      <FormGroup>
        <FormItem grow="1">
          <TextInput
            name={name.price}
            value={form.price}
            error={error.price}
            placeholder={placeholder.price}
            onChange={handlerChange}
            onBlur={handlerBlur}
          />
        </FormItem>
        <FormItem grow="1">
          <TextInput
            name={name.priceSale}
            value={form.priceSale || ""}
            error={error.priceSale}
            placeholder={placeholder.priceSale}
            onChange={handlerChange}
            onBlur={handlerBlur}
          />
        </FormItem>
      </FormGroup>

      <br />
      <CharacteristicsForm value={form.characteristics} setForm={setForm} />
      <br />
      <Button disabled={!isValid}>
        {isLoading ? <Loading /> : product ? "Обновить" : "Создать"}
      </Button>
    </form>
  );
};

export default React.memo(AdminProductFormPage);
