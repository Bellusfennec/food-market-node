import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IconButton } from "../form";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  deleteFavorite,
  getFavoriteById,
} from "../../../store/favorite";
import style from "./FavoriteToggle.module.scss";

const FavoriteToggle = (props) => {
  const { id, className } = props;
  const dispatch = useDispatch();
  const inFavorite = useSelector(getFavoriteById(id));

  return (
    <div className={className}>
      {!inFavorite && (
        <IconButton
          onClick={() => dispatch(addFavorite(id))}
          className={style.white}
        >
          <MdFavoriteBorder />
        </IconButton>
      )}
      {inFavorite && (
        <IconButton
          onClick={() => dispatch(deleteFavorite(id))}
          className={style.red}
        >
          <MdFavorite />
        </IconButton>
      )}
    </div>
  );
};

export default FavoriteToggle;
