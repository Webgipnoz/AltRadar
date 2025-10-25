export interface baseRow {
  id: number;
  favorite?: boolean;
  filter?: boolean;
}

export interface Column<T> {
  key: keyof T;
  label: string;
}
