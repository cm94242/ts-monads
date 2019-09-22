import { Try } from '../src/try'

describe('try suite', () => {

	test(`success basics`, () => {
		const t: Try<number> = Try.of(() => 1)
		expect(t.isSuccess()).toBe(true)
		expect(t.isFailure()).toBe(false)

		const mapped = t.map(v => v + v)
		expect(mapped.isSuccess()).toBe(true)
		expect(mapped.get()).toBe(2)
	})

	test(`failure basics`, () => {
		const t: Try<number> = Try.of(() => { throw new Error('error') })
		expect(t.isSuccess()).toBe(false)
		expect(t.isFailure()).toBe(true)

		const mapped = t.map(v => v + v)
		expect(mapped.isFailure()).toBe(true)

		try {
			mapped.get()
			fail('oh no')
		} catch(err){
			expect(err.message).toBe('error')
		}
	})

})
