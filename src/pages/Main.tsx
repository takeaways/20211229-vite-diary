import { useContext, useEffect, useState } from "react";
import { Content } from "types";

import { DiaryStateContext } from "app/App";

import Button from "components/common/Button";
import Header from "components/common/Header";
import List from "components/common/List";

const Main = () => {
  const diaryList = useContext(DiaryStateContext);

  // control month
  const [currentDate, setCurrentDate] = useState(new Date());
  const headText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
  const increaseMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
    );
  };
  const decreaseMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()),
    );
  };

  // data control
  const [data, setData] = useState<Array<Content>>(diaryList);
  useEffect(() => {
    if (diaryList.length > 0) {
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59,
      ).getTime();

      setData(
        diaryList.filter((diary) => diary.created_at >= firstDay && diary.created_at <= lastDay),
      );
    }
  }, [currentDate, diaryList]);

  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button text="<" onClick={decreaseMonth} />}
        rightChild={<Button text=">" onClick={increaseMonth} />}
      />
      <List items={data} />
    </div>
  );
};

export default Main;
