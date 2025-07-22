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

declare type d = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

// Date string type alias for clarity (avoiding union complexity)
declare type DateString = string
