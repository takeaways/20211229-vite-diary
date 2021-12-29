import React, { memo, useRef } from "react";
import { Content } from "types";
import { v4 as uuidv4 } from "uuid";

import { toast } from "components/ToastRoot";

import "./Editor.css";

interface Props {
  onSubmit: (content: Content) => void;
}

const Editor = ({ onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const emotionRef = useRef<HTMLSelectElement>(null);

  const handleSubmitContent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current || !authorRef.current || !contentRef.current || !emotionRef.current) {
      throw new Error("Should Connect Ref");
    }

    const author = authorRef.current.value;
    const content = contentRef.current.value;
    const emotion = emotionRef.current.value;

    if (author.length < 1) {
      authorRef.current.focus();
      return toast.error("작성자를 입력해 주세요!");
    }
    if (content.length < 6) {
      contentRef.current.focus();
      return toast.error("내용을 5글자 이상 입력해 주세요!");
    }

    onSubmit({
      id: uuidv4(),
      author,
      content,
      emotion,
      created_at: new Date().getTime(),
    });

    formRef.current.reset();
  };

  return (
    <div className="Editor">
      <h2 className="title">Emotion Diary</h2>
      <form ref={formRef} onSubmit={handleSubmitContent}>
        <div>
          <input ref={authorRef} type="text" placeholder="Author" defaultValue={"Calix"} />
        </div>
        <div>
          <textarea ref={contentRef} placeholder="Content" />
        </div>
        <div>
          <label>
            Today&rsquo;s Emotion Point : &nbsp;
            <select ref={emotionRef}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={1}>5</option>
            </select>
          </label>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default memo(Editor);
