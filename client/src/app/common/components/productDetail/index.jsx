import style from "./ProductDetail.module.scss";
import CategoryName from "../../../common/components/categoryName/index";
import Button from "../form/Button";
import SpecificationName from "../specificationName/index";
import Image from "../image";

const ProductDetail = (props) => {
  const { name, image, category, price, priceSale, characteristicsList } =
    props;
  const { _id, addToBasket, inBasket, increaseInBasket, decreaseInBasket } =
    props;
  return (
    <>
      <div>
        <h1>{name}</h1>
        <br />
        <hr />
        <br />
      </div>
      <div className={style.container}>
        <div className={style.left}>
          <Image alt={name} image={image} />
        </div>
        <div className={style.center}>
          <p>
            Категория: <CategoryName id={category} />
          </p>

          {characteristicsList.length > 0 && (
            <>
              <br />
              <h5>Характеристики</h5>
              {characteristicsList.map((c) => (
                <div key={c._id} className={style.characteristic}>
                  <div>
                    <span>
                      <SpecificationName id={c.specification} />
                    </span>
                  </div>
                  <div>{c.value}</div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className={style.right}>
          <p className={style.price}>{price} ₽</p>
          {priceSale && <p>{priceSale}</p>}
          {!inBasket && (
            <Button onClick={() => addToBasket(_id)} className={style.basket}>
              Добавить в корзину
            </Button>
          )}
          {inBasket && (
            <div className={style.basketButtons}>
              <Button
                onClick={() => decreaseInBasket(_id)}
                className={style.basket}
              >
                -
              </Button>
              <div>{inBasket.productCount}</div>
              <Button
                onClick={() => increaseInBasket(_id)}
                className={style.basket}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
