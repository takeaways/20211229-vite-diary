import DiaryPresenter from "presenters/Diary";
import { useCallback, useState } from "react";
import { Content } from "types";

import DiaryList from "components/diary/diary-list/DiaryList";
import Editor from "components/editor/Editor";

interface Props {
  presenter: DiaryPresenter<Content>;
}

const Home = ({ presenter }: Props) => {
  const [diaries, setDiaries] = useState(presenter.getDiaries());

  const onCreateNewDiary = useCallback(
    (newDiary: Content) => {
      presenter.add(newDiary, setDiaries);
    },
    [presenter],
  );

  const onDeleteDiary = useCallback(
    (content: Content) => {
      presenter.delete(content, setDiaries);
    },
    [presenter],
  );

  const onEditDiary = useCallback(
    (content: Content) => {
      presenter.edit(content, setDiaries);
    },
    [presenter],
  );

  return (
    <div className="Home">
      <Editor onSubmit={onCreateNewDiary} />
      <DiaryList items={diaries} onDelete={onDeleteDiary} onEdit={onEditDiary} />
    </div>
  );
};

export default Home;
