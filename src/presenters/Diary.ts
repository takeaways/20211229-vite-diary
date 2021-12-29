import { Content } from "types";

class DiaryPresenter<Item extends Content> {
  constructor(private state: Item[] = []) {
    this.state = state;
  }

  getDiaries() {
    return this.state;
  }

  setDiaries(diaries: Item[]) {
    this.state = diaries;
  }

  add(item: Item, updator: React.Dispatch<Item[]>) {
    this.state = [...this.state, item];
    updator(this.state);
  }

  delete(item: Item, updator: React.Dispatch<Item[]>) {
    this.state = this.state.filter((it) => it.id !== item.id);
    updator(this.state);
  }

  edit(item: Item, updator: React.Dispatch<Item[]>) {
    this.state = this.state.map(this.itemEditHeler(item));
    updator(this.state);
  }

  private itemEditHeler(editedItem: Item) {
    return (item: Item) => {
      if (item.id !== editedItem.id) return item;
      return {
        ...item,
        ...editedItem,
      };
    };
  }
}

export default DiaryPresenter;
