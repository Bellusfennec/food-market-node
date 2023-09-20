import { useSelector } from "react-redux";
import List from "../../common/components/card/List";
import Container from "../../common/components/container";
import Loading from "../../common/components/loading";
import ProductCard from "../../common/components/productCard";
import MainLayout from "../../layouts/main";
import { getFavoriteProductList } from "../../store/favorite";
import { getProductsLoadingStatus } from "../../store/product";
import style from "./FavoritePage.module.scss";
import WrapperBorder from "../../common/components/wrapperBorder";
import { Button } from "../../common/components/form";
import { useNavigate } from "react-router-dom";

const FavoritePage = () => {
  const navigate = useNavigate();
  const favorites = useSelector(getFavoriteProductList());
  const isLoadingProducts = useSelector(getProductsLoadingStatus());

  if (isLoadingProducts) {
    return (
      <MainLayout>
        <Container>
          <Loading />
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {!isLoadingProducts && favorites.length === 0 && (
        <Container className={style.width}>
          <WrapperBorder>
            <div className={style.empty}>
              <p>Отложенных товаров нет.</p>
              <br />
              <Button onClick={() => navigate("/")}>К ассортименту</Button>
            </div>
          </WrapperBorder>
        </Container>
      )}

      {!isLoadingProducts && favorites.length > 0 && (
        <Container>
          <h3>Отложенные товары</h3>
          <br />
          <List>
            {favorites.map((m) => (
              <ProductCard
                key={m._id}
                {...m}
                link={`/product/detail/${m._id}`}
              />
            ))}
          </List>
        </Container>
      )}
    </MainLayout>
  );
};

export default FavoritePage;
