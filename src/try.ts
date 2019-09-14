
export interface TryMatch<T, T2> {
	success: (T) => T2
	failure: (e: Error) => T2
}

export abstract class Try<T> {

	static create<T>(fxn: () => Try<T>) {
		try {
			return new Success(fxn())
		} catch (err) {
			return new Failure(err)
		}
	}
}

class Success<T> extends Try<T> {

	constructor(private readonly t: T){
		super()
	}
}

class Failure<T> extends Try<T> {

	constructor(private readonly err: Error){
		super()
	}
}
