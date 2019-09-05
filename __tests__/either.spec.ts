import { Either, EitherMatch } from '../src/either'

describe('either suite', () => {

	test(`bad basics`, () => {
		try {
			const either: Either<number, string> = Either.left(null)
			fail("Should be a number, not a null")
		} catch (err) {}

		try {
			const either: Either<number, string> = Either.left(undefined)
			fail("Should be a number, not a null")
		} catch (err) {}
	})

	test(`left basics`, () => {
		const either: Either<number, string> = Either.left(5)
		expect(either.isLeft()).toBe(true)
		expect(either.isRight()).toBe(false)
		expect(either.value()).toBe(5)

		expect(either.match({
			left: () => true,
			right: () => false,
		})).toBe(true)
	})

	test(`right basics`, () => {
		const either: Either<number, string> = Either.right("right")
		expect(either.isRight()).toBe(true)
		expect(either.isLeft()).toBe(false)
		expect(either.value()).toBe("right")

		expect(either.match({
			left: () => false,
			right: () => true,
		})).toBe(true)
	})

})
