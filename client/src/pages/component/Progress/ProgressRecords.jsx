import { useParams } from "react-router-dom";
import { useGetProgressRecordsQuery } from "../../../redux/progressRelated/progressApiSlice";

const ProgressRecords = () => {
  //Get studentId from url params
  const { id } = useParams();

  const { data } = useGetProgressRecordsQuery(id);
  console.log(data);

  return <></>;
};

export default ProgressRecords;
