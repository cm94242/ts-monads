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
}

class Failure<T> extends Try<T> {

	constructor(private readonly err: Error){
		super()
	}

	isSuccess() : boolean {
		return false
	}
}
