import { Try } from '../src/try'

describe('try suite', () => {

	test(`success basics`, () => {
		const t: Try<number> = Try.of(() => 1)
		expect(t.isSuccess()).toBe(true)
		expect(t.isFailure()).toBe(false)
	}
	)
	test(`failure basics`, () => {
		const t: Try<number> = Try.of(() => { throw new Error('error') })
		expect(t.isSuccess()).toBe(false)
		expect(t.isFailure()).toBe(true)
	})

})
