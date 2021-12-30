import { createContext, useCallback, useMemo, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Content } from "types";

import DiaryPresenter from "presenters/Diary";

import Detail from "pages/Detail";
import Edit from "pages/Edit";
import Home from "pages/Home";
import Main from "pages/Main";
import New from "pages/New";

const diaryPresenter = new DiaryPresenter<Content>([]);

const initialState: Array<Content> = [
  {
    id: "222",
    emotion: "1",
    content: "1hello world",
    created_at: 1640880582669,
    author: "calix",
  },
  {
    id: "55",
    emotion: "2",
    content: "2hello wor3222ld",
    created_at: 1640880582669 + 2,
    author: "calix",
  },
  {
    id: "2222",
    emotion: "5",
    content: "3hello worl3d",
    created_at: 1640880582669 + 3,
    author: "calix",
  },
];
type State = typeof initialState;
enum ActionName {
  INIT = "INIT",
  CREATE = "CREATE",
  DELETE = "DELETE",
  EDIT = "EDIT",
}
type Action =
  | { type: Exclude<ActionName, ActionName.INIT>; payload: Content }
  | { type: ActionName.INIT; payload: Content[] };
const reducer = (state: State, action: Action): State => {
  let newState: State;

  switch (action.type) {
    case ActionName.INIT: {
      return action.payload;
    }
    case ActionName.CREATE: {
      const newItem = { ...action.payload };
      newState = [...state, newItem];
      return newState;
    }
    case ActionName.EDIT: {
      return state.map((item) => (item.id !== action.payload.id ? item : action.payload));
    }
    case ActionName.DELETE: {
      return state.filter((item) => item.id !== action.payload.id);
    }
    default:
      return state;
  }
};

export const DiaryStateContext = createContext(initialState);
export const DiaryDispatchContext = createContext<{
  onCreate?: (item: Content) => void;
  onDelete?: (item: Content) => void;
  onEdit?: (item: Content) => void;
}>({});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onCreate = useCallback((newItem: Content) => {
    dispatch({ type: ActionName.CREATE, payload: newItem });
  }, []);

  const onDelete = useCallback((currentItem: Content) => {
    dispatch({ type: ActionName.DELETE, payload: currentItem });
  }, []);

  const onEdit = useCallback((editedItem: Content) => {
    dispatch({ type: ActionName.EDIT, payload: editedItem });
  }, []);

  const handlers = useMemo(() => ({ onCreate, onDelete, onEdit }), [onCreate, onDelete, onEdit]);

  return (
    <DiaryStateContext.Provider value={state}>
      <DiaryDispatchContext.Provider value={handlers}>
        <div className="App">
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
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
