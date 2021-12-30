import { emotionList } from "constant";
import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "types";
import { getDateHelper } from "utils";
import { v4 as uuidv4 } from "uuid";

import { DiaryDispatchContext } from "app/App";

import { toast } from "components/ToastRoot";

import Button from "./Button";
import EmotionItem from "./EmotionItem";

interface Props {
  origin?: Content;
}

const Editor = ({ origin }: Props) => {
  const navigation = useNavigate();

  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getDateHelper(new Date()));
  const [content, setContent] = useState("");

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onClickEmotion = (emotion: number) => {
    setEmotion(emotion);
  };

  const onWriteDiary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content.length < 1) {
      contentRef.current?.focus();
      toast.error("오늘은 어땠는지 적어주세요!");
      return;
    }

    if (!confirm(origin ? "수정하시겠습니까?" : "새로운 글을 추가하시겠습니까?")) {
      return;
    }
    if (origin) {
      onEdit?.({
        ...origin,
        content,
        created_at: new Date(date).getTime(), //updated time
        emotion: String(emotion),
      });
    } else {
      onCreate?.({
        id: uuidv4(),
        content,
        created_at: new Date().getTime(),
        emotion: String(emotion),
        author: "Calix",
      });
    }

    navigation("/", { replace: true });
  };

  const goBack = () => {
    navigation(-1);
  };

  useLayoutEffect(() => {
    if (!origin) return;

    setContent(origin.content);
    setDate(getDateHelper(new Date(origin.created_at)));
    setEmotion(Number(origin.emotion));
  }, [origin]);

  return (
    <div className="DiaryEditor">
      <section>
        <h4>오늘 날짜가 어찌되오?</h4>
        <div className="input_box">
          <input className="input_date" value={date} type="date" onChange={onChangeDate} />
        </div>
      </section>

      <section>
        <h4>오늘의 감정?</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((em) => (
            <EmotionItem
              key={em.emotion_id}
              {...em}
              onClick={onClickEmotion}
              isSelected={em.emotion_id === emotion}
            />
          ))}
        </div>
      </section>

      <section>
        <h4>오늘의 내 글?</h4>
        <div className="input_box text_wrapper">
          <textarea
            ref={contentRef}
            value={content}
            onChange={onWriteDiary}
            placeholder="오늘은 어떘나요?"
          />
        </div>
      </section>

      <section>
        <div className="control_box">
          <Button text="취소하기" onClick={goBack} />
          <Button text="작성완료" type="POSITIVE" onClick={onSubmit} />
        </div>
      </section>
    </div>
  );
};

export default Editor;
