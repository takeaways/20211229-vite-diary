import DiaryPresenter from "presenters/Diary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Content } from "types";

import Home from "pages/Home";

const dummyList: Content[] = [
  {
    id: "hello",
    author: "calix",
    content: "hello world",
    emotion: "5",
    created_at: new Date().getTime(),
  },
];
const diaryPresenter = new DiaryPresenter<Content>(dummyList);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home presenter={diaryPresenter} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
