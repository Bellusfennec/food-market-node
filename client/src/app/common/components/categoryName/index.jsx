import { useSelector } from "react-redux";
import { getCategoryById } from "../../../store/category";

const CategoryName = ({ id }) => {
  const { name } = useSelector(getCategoryById(id));
  return name;
};

export default CategoryName;
