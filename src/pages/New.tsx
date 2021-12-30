import { useNavigate } from "react-router-dom";

import Button from "components/common/Button";
import Editor from "components/common/Editor";
import Header from "components/common/Header";

const New = () => {
  const navigation = useNavigate();

  return (
    <div className="New">
      <Header
        headText="새 글쓰기"
        leftChild={<Button text="< 뒤로가기" onClick={() => navigation(-1)} />}
      />
      <Editor />
    </div>
  );
};

export default New;
