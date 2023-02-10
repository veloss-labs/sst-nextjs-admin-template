export type ApiRoutes = URL | Request | string;

export type Nullable<T> = T | null;

export type NoInfer<T> = [T][T extends any ? 0 : never];

export type IsAny<T, Y, N> = 1 extends 0 & T ? Y : N;

export type IsAnyBoolean<T> = 1 extends 0 & T ? true : false;

export type IsKnown<T, Y, N> = unknown extends T ? N : Y;

export type Values<O> = O[ValueKeys<O>];

export type ValueKeys<O> = Extract<keyof O, PropertyKey>;

export type Timeout = ReturnType<typeof setTimeout>;
