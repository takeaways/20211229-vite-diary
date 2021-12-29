import { memo } from "react";
import { Content } from "types";

import "./DiaryListItem.css";

interface Props {
  diary: Content;
  onDelete?: (diary: Content) => void;
  onEdit?: (diary: Content) => void;
}
const DiaryListItem = ({ diary, onDelete }: Props) => {
  const { author, emotion, created_at, content } = diary;
  return (
    <div className="DiaryListItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_at).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
      <button
        className="delete"
        onClick={() => {
          onDelete?.(diary);
        }}
      >
        지우기
      </button>
    </div>
  );
};

export default memo(DiaryListItem);
