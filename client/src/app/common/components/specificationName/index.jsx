import { useSelector } from "react-redux";
import { getSpecificationById } from "../../../store/specification";

const SpecificationName = ({ id }) => {
  const specification = useSelector(getSpecificationById(id));
  return specification?.name ? specification?.name : "Ошибка";
};

export default SpecificationName;
