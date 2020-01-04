import { Option, OptionMatch } from '../src/option'

describe('option suite', () => {

	test('Construction basics', () => {
		const some: Option<number> = Option.some(5)
		expect(some.isDefined()).toBe(true)

		const none: Option<number> = Option.none()
		expect(none.isDefined()).toBe(false)

		// this is gross, there has to be a better way
		const from1: Option<number> = Option.from(5) as unknown as Option<number>
		expect(from1.isDefined()).toBe(true)

		const from2: Option<number> = Option.from(null) as unknown as Option<number>
		expect(from2.isDefined()).toBe(false)
	})

	test(`None basics`, () => {
		const none: Option<number> = Option.none()
		expect(none.isEmpty()).toBe(true)
		expect(none.isDefined()).toBe(false)
		expect(none.map(v => v).isDefined()).toBe(false)
		expect(none.flatMap(v => Option.some(v)).isDefined()).toBe(false)
		expect(none.fold('5', v => `${v}`)).toBe('5')
		expect(none.getOrElse(5)).toBe(5)
		expect(none.orElse(Option.some(5)).get()).toBe(5)
		expect(none.filter(v => false).isDefined()).toBe(false)
		expect(none.filter(v => true).isDefined()).toBe(false)

		expect(none.match({
			some: v => false,
			none: () => true
		})).toBe(true)

		try {
			none.get()
			fail('Should not have been invoked')
		} catch (err) {}
	})

	test(`Some basics`, () => {
		const some: Option<number> = Option.some(1)
		expect(some.isEmpty()).toBe(false)
		expect(some.isDefined()).toBe(true)
		expect(some.map(v => v).isDefined()).toBe(true)
		expect(some.flatMap(v => Option.some(v)).isDefined()).toBe(true)
		expect(some.fold('5', v => `${v}`)).toBe('1')
		expect(some.getOrElse(5)).toBe(1)
		expect(some.orElse(Option.some(5)).get()).toBe(1)
		expect(some.filter(v => false).isDefined()).toBe(false)
		expect(some.filter(v => true).isDefined()).toBe(true)

		expect(some.match({
			some: v => true,
			none: () => false
		})).toBe(true)

		try {
			expect(some.get()).toBe(1)
		} catch (err) {
			fail('Should not have been invoked')
		}

	})

})
