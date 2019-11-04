export type ValueInObject<O extends {}> = O[keyof O];

export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export type Iterator<T extends any> = (args: {
  item: T;
  index: number;
  next: () => void;
  abort: () => void;
}) => any;

export type AsyncIteratorHandlerArgs<T extends any> = {
  queue: T[];
  iterator?: Iterator<T>;
  onEnd?: () => void;
};

export type AsyncIteratorHandler = <T extends any>(
  args: AsyncIteratorHandlerArgs<T>
) => Promise<void>;
