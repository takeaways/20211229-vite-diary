import { useContext } from "react";

import { ItemContext } from "pages/Home";

import DiaryListItem from "../diary-list-item/DiaryListItem";
import "./DiaryList.css";

const DiaryList = () => {
  const items = useContext(ItemContext);
  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h3> {items.length}개의 Diary가 있습니다.</h3>
      <div>
        {items.map((item) => (
          <DiaryListItem key={item.id} diary={item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
