export interface TryMatch<T, T2> {
	success: (T) => T2
	failure: (e: Error) => T2
}

export abstract class Try<T> {

	static of<T>(fxn: () => T) {
		try {
			return new Success<T>(fxn())
		} catch (err) {
			return new Failure<T>(err)
		}
	}

	abstract isSuccess() : boolean

	abstract map<U>(fxn: (T) => U): Try<U>

	abstract get(): T

	isFailure(): boolean {
		return !this.isSuccess()
	}
}

class Success<T> extends Try<T> {
	constructor(private readonly t: T){
		super()
	}

	isSuccess() : boolean {
		return true
	}

	map<U>(fxn: (T) => U) : Try<U> {
		const val = fxn(this.t)
		return new Success(val)
	}

	get(): T {
		return this.t
	}
}

class Failure<T> extends Try<T> {

	constructor(private readonly err: Error){
		super()
	}

	isSuccess() : boolean {
		return false
	}

	map<U>(fxn: (T) => U) {
		return new Failure<U>(this.err)
	}

	get() : T {
		throw this.err
	}
}
