import { emotionList } from "constant";
import { useContext, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDateHelper } from "utils";

import { DiaryStateContext } from "app/App";

import Button from "components/common/Button";
import Header from "components/common/Header";

const Detail = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const diary = diaryList.find((da) => da.id === id);
  const emotionData = emotionList.find((em) => String(em.emotion_id) === diary?.emotion);

  useLayoutEffect(() => {
    if (!diary) {
      alert("없는 글입니다.");
      setTimeout(() => {
        navigation("/", { replace: true });
      }, 0);
    }
  }, [diary, navigation]);

  if (!diary || !emotionData) {
    return <h3>loading....</h3>;
  }

  return (
    <div className="Detail">
      <Header
        headText={`${getDateHelper(new Date(diary.created_at))} 기록`}
        leftChild={<Button text="< 뒤로가기" onClick={() => navigation(-1)} />}
        rightChild={
          <Button text="수정하기" onClick={() => navigation(`/diary/${diary.id}/edit`)} />
        }
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div className={`diary_img_wrapper diary_img_wrapper_${emotionData.emotion_id}`}>
            <img src={emotionData.emotion_img} alt={emotionData.emotion_description} />
            <div className="emotion_description">{emotionData.emotion_description}</div>
          </div>
        </section>

        <section>
          <h4>오늘의 글</h4>
          <div className="diary_content_wrapper">
            <p>{diary.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Detail;
