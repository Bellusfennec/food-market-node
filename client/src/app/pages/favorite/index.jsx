import { useSelector } from "react-redux";
import List from "../../common/components/card/List";
import Container from "../../common/components/container";
import Loading from "../../common/components/loading";
import ProductCard from "../../common/components/productCard";
import MainLayout from "../../layouts/main";
import { getFavoriteProductList } from "../../store/favorite";
import { getProductsLoadingStatus } from "../../store/product";

const FavoritePage = () => {
  const favorites = useSelector(getFavoriteProductList());
  const isLoadingProducts = useSelector(getProductsLoadingStatus());
  return (
    <MainLayout>
      <Container>
        <h3>Отложенные</h3>
        <br />
        {isLoadingProducts && (
          <>
            <Loading />
          </>
        )}
        {!isLoadingProducts && favorites.length === 0 && (
          <p>Ничего не добавлено.</p>
        )}
        {!isLoadingProducts && favorites.length > 0 && (
          <List>
            {favorites.map((m) => (
              <ProductCard
                key={m._id}
                {...m}
                link={`/product/detail/${m._id}`}
              />
            ))}
          </List>
        )}
      </Container>
    </MainLayout>
  );
};

export default FavoritePage;
