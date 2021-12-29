import { Content } from "types";

import DiaryListItem from "../diary-list-item/DiaryListItem";
import "./DiaryList.css";

interface Props {
  items: Content[];
  onDelete?: (diary: Content) => void;
  onEdit?: (diary: Content) => void;
}
const DiaryList = ({ items, onDelete, onEdit }: Props) => {
  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h3> {items.length}개의 Diary가 있습니다.</h3>
      <div>
        {items.map((item) => (
          <DiaryListItem key={item.id} diary={item} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
