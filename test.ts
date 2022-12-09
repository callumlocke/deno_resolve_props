import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts'
import { expectType } from 'npm:tsd@^0.25.0'
import { resolveProps } from './mod.ts'

Deno.test(
  'works with a mix of promises, plain values, and promise-like values',
  async () => {
    const result = await resolveProps({
      a: Promise.resolve(Promise.resolve(1)),

      b: 'two',

      c: {
        then: (resolve: (result: [3, 3, 3]) => void) => {
          resolve([3, 3, 3])
        },
      },
    })

    assertEquals(result, { a: 1, b: 'two', c: [3, 3, 3] })

    expectType<number>(result.a)
    expectType<string>(result.b)
    expectType<number[]>(result.c)
  }
)

Deno.test('works with empty object', async () => {
  const result = await resolveProps({})

  assertEquals(result, {})

  expectType<typeof result>({})
})
