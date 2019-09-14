import { Try } from '../src/try'

describe('try suite', () => {

	test(`success basics`, () => {
		const t: Try<number> = Try.of(() => 1)
		expect(t.isSuccess()).toBe(true)
	}
	)
	test(`failure basics`, () => {
		const t: Try<number> = Try.of(() => { throw new Error('error') })
		expect(t.isSuccess()).toBe(false)
	})

})
