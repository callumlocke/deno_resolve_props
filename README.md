# resolve_props

> TypeScript function intended for use with Deno

Like `Promise.all`, but for objects instead of arrays. The returned promise resolves to an object with the same keys as the input object, but with all the values awaited.

```ts
import { resolveProps } from 'https://deno.land/x/resolve_props/mod.ts'

const result = await resolveProps({
  hello: Promise.resolve('world'),
  foo: 123,
})

console.log(result) // { hello: 'world', foo: 123 }

// Return type is inferred correctly:
result
// ^? { hello: string, foo: number }
```

- Any promise-like value is awaited
- Other values are passed through unchanged
- The promises' return values can be a mix of different types, inference still works

## Testing

```sh
> bin/test
```
