import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Content } from "types";

import { DiaryStateContext } from "app/App";

import Button from "components/common/Button";
import Editor from "components/common/Editor";
import Header from "components/common/Header";

const Edit = () => {
  const navigation = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const { id } = useParams();

  const [origin, setOrigin] = useState<Content>();

  useEffect(() => {
    if (diaryList.length > 0) {
      const diary = diaryList.find((d) => d.id === id);
      if (!diary) {
        navigation("/", { replace: true });
        return;
      }
      setOrigin(diary);
    }
  }, [id, diaryList, navigation]);

  return (
    <div>
      <Header
        headText="글 수정하기"
        leftChild={<Button text="< 뒤로가기" onClick={() => navigation(-1)} />}
      />
      <Editor origin={origin} />
    </div>
  );
};

export default Edit;
