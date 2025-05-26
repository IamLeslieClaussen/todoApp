import ListItem from "./ListItem";

export interface List {
  list: ListItem[];
  save(): void;
  load(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
  clearList(): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private _list: ListItem[];

  private constructor(list: ListItem[] = []) {
    this._list = list;
  }

  get list(): ListItem[] {
    return this._list;
  }

  save(): void {
    localStorage.setItem("mylist", JSON.stringify(this._list));
  }

  load(): void {
    const storedList = localStorage.getItem("mylist");
    if (typeof storedList !== "string") return;

    this._list = [];

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }

  clearList(): void {
    this._list = [];
    this.save();
  }
}
