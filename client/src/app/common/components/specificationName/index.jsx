import { useSelector } from "react-redux";
import { getSpecificationById } from "../../../store/specification";

const SpecificationName = ({ id }) => {
  const { name } = useSelector(getSpecificationById(id));
  return name;
};

export default SpecificationName;
