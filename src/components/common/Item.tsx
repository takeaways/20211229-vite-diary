import { useNavigate } from "react-router-dom";
import { Content } from "types";

import Button from "./Button";

interface Props {
  item: Content;
}
const Item = ({ item }: Props) => {
  const navigation = useNavigate();
  const goDetail = () => {
    navigation(`/diary/${item.id}`);
  };

  const goEdit = () => {
    navigation(`/diary/${item.id}/edit`);
  };

  const startDate = new Date(item.created_at).toLocaleDateString();

  return (
    <div className="Item" key={item.id}>
      <div onClick={goDetail} className={`emotion_img_wrapper emotion_img_wrapper_${item.emotion}`}>
        <img src={`/emotion/emotion${item.emotion}.png`} alt="" />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{startDate}</div>
        <div className="diary_content_preview">{item.content.slice(0, 25)}...</div>
      </div>
      <div className="btn_wrapper">
        <Button text="수정하기" onClick={goEdit} />
      </div>
    </div>
  );
};

export default Item;
