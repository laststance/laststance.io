// https://stackoverflow.com/a/69288824/8440230
declare type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
    ? { [K in keyof O]: O[K] }
    : never

declare type ExpandRecursively<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
  : T extends object
    ? T extends infer O
      ? { [K in keyof O]: ExpandRecursively<O[K]> }
      : never
    : T

// DateString type that enforces YYYY-MM-DD format
// Provides reasonable type safety without overwhelming TypeScript's type checker
declare type DateString =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`
