export interface IMenu {
  _id: {
    secondCategory: string;
  };
  isOpened?: boolean;
  pages: IPage[];
}

export interface IPage {
  alias: string;
  title: string;
  _id: string;
  category: string;
}
