export interface ApiResponse<T> {
  data: T;
  message: string;
}

export type TypeGuard<T> = (value: unknown) => value is T;
