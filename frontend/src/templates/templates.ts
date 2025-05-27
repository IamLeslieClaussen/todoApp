import FullList from "../model/FullList";
import ListItem from "../model/ListItem";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(FullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      //check element
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.tabIndex = 0;
      check.checked = item.checked;
      li.append(check);

      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      //label element
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.classList = "button";
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });
      this.ul.append(li);
    });
  }
}
