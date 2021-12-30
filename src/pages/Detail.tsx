import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  return <div>Detail Detail - i-{id}</div>;
};

export default Detail;
