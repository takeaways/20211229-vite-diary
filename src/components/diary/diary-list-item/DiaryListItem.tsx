import { memo, useContext, useRef, useState } from "react";
import { Content } from "types";

import { ItemHandlerContext } from "pages/Home";

import { toast } from "components/ToastRoot";

import "./DiaryListItem.css";

interface Props {
  diary: Content;
}
const DiaryListItem = ({ diary }: Props) => {
  const { author, emotion, created_at, content } = diary;
  const { onDelete, onEdit } = useContext(ItemHandlerContext);

  const [isEdit, setIsEdit] = useState(false);
  const onToggleIsEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onDeleteDiary = () => {
    onDelete?.(diary);
  };

  const editContentRef = useRef<HTMLTextAreaElement>(null);
  const onEditContent = () => {
    onToggleIsEdit();

    if (!editContentRef.current) {
      return;
    }

    const editedContent = editContentRef.current.value;

    if (editedContent.length < 6) {
      onToggleIsEdit();
      editContentRef.current.focus();
      return toast.error("내용을 5글자 이상 입력해주세요.");
    }

    isEdit && onEdit?.({ ...diary, content: editContentRef.current.value });
  };

  return (
    <div className="DiaryListItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_at).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? <textarea ref={editContentRef} defaultValue={content} /> : content}
      </div>
      <button className="delete-btn" onClick={onDeleteDiary}>
        제거하기
      </button>
      <button className="edit-btn" onClick={onEditContent}>
        {isEdit ? "수정완료" : "수정하기"}
      </button>
    </div>
  );
};

export default memo(DiaryListItem);
