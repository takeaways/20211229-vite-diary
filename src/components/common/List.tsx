import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "types";

import Button from "./Button";
import Item from "./Item";

interface ControlMenuProps {
  value: string;
  onChange: (value: string) => void;
  optionList: typeof sortOptionList | typeof filterOptionList;
}

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
] as const;

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 상태만" },
  { value: "bad", name: "나쁜 상태만" },
] as const;

const ControlMenu = ({ value, onChange, optionList }: ControlMenuProps) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((op) => (
        <option key={op.value} value={op.value}>
          {op.name}
        </option>
      ))}
    </select>
  );
};

interface Props {
  items: Array<Content>;
}

const List = ({ items }: Props) => {
  const navigation = useNavigate();

  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const copied = JSON.parse(JSON.stringify(items));
    // Date
    const compare = (a: Content, b: Content) => {
      if (sortType === "latest") {
        return b.created_at - a.created_at;
      }
      return a.created_at - b.created_at;
    };
    const sortedList = copied.sort(compare);

    // Emotion
    const filterCallback = (item: Content) => {
      if (filter === "good") {
        return Number(item.emotion) <= 3;
      } else {
        return Number(item.emotion) > 3;
      }
    };

    const filteredList = filter === "all" ? sortedList : items.filter(filterCallback);

    return filteredList;
  };

  return (
    <nav className="List">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu optionList={sortOptionList} value={sortType} onChange={setSortType} />
          <ControlMenu optionList={filterOptionList} value={filter} onChange={setFilter} />
        </div>
        <div className="right_col">
          <Button
            text="새 글쓰기"
            type="POSITIVE"
            onClick={() => {
              navigation("/new");
            }}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((item: Content) => (
        <Item key={item.id} item={item} />
      ))}
    </nav>
  );
};

export default List;
