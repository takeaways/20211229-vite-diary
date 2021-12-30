import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Content } from "types";

import DiaryPresenter from "presenters/Diary";

import Detail from "pages/Detail";
import Edit from "pages/Edit";
import Home from "pages/Home";
import Main from "pages/Main";
import New from "pages/New";

const diaryPresenter = new DiaryPresenter<Content>([]);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary">
          <Route path=":id" element={<Detail />} />
          <Route path=":id/edit" element={<Edit />} />
        </Route>
        <Route path="/old" element={<Home presenter={diaryPresenter} />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
