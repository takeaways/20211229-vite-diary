import { createContext, useCallback, useMemo, useState } from "react";
import { Content } from "types";

import DiaryPresenter from "presenters/Diary";

import DiaryList from "components/diary/diary-list/DiaryList";
import Editor from "components/editor/Editor";

interface Props {
  presenter: DiaryPresenter<Content>;
}

export const ItemContext = createContext<Array<Content>>([]);
export const ItemHandlerContext = createContext<{
  onSubmit?: (content: Content) => void;
  onDelete?: (diary: Content) => void;
  onEdit?: (diary: Content) => void;
}>({});

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

  const handlers = useMemo(
    () => ({
      onSubmit: onCreateNewDiary,
      onDelete: onDeleteDiary,
      onEdit: onEditDiary,
    }),
    [onCreateNewDiary, onDeleteDiary, onEditDiary],
  );

  return (
    <ItemContext.Provider value={diaries}>
      <ItemHandlerContext.Provider value={handlers}>
        <div className="Home">
          <Editor />
          <DiaryList />
        </div>
      </ItemHandlerContext.Provider>
    </ItemContext.Provider>
  );
};

export default Home;
