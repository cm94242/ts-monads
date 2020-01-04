export interface OptionMatch<T, T2> {
	some: (arg: T) => T2,
	none: () => T2
}

export abstract class Option<T>{
	abstract map<T2>(fxn: (arg: T) => T2) : Option<T2>

	abstract flatMap<T2>(fxn: (arg: T) => Option<T2>) : Option<T2>

	abstract filter(fxn: (arg: T) => boolean) : Option<T>

	abstract get() : T

	abstract isDefined(): boolean

	match<T2>(matcher: OptionMatch<T, T2>) : T2 {
		return this.isDefined() ? matcher.some(this.get()) : matcher.none()
	}

	fold<T2>(alternate: T2, fxn: (arg: T) => T2) : T2 {
		return this.isDefined() ? fxn(this.get()) : alternate
	}

	getOrElse(alternate: T) : T {
		return this.isDefined() ? this.get() : alternate
	}

	orElse(alternate: Option<T>) : Option<T> {
		return this.isDefined() ? this : alternate
	}

	isEmpty() : boolean {
		return !this.isDefined()
	}

	static none<T>() : Option<T> {
		return new None<T>()
	}

	static some<T>(arg: T) : Option<T> {
		if (null == arg){
			throw new Error("Some cannot be null!")
		}
		return new Some<T>(arg)
	}
}

class Some<T> extends Option<T> {
	constructor(private readonly arg: T){
		super()
	}

	isDefined() : boolean {
		return true
	}

	map<T2>(fxn: (arg: T) => T2) : Option<T2> {
		const tmp : T2 = fxn(this.arg)
		return new Some<T2>(tmp)
	}

	flatMap<T2>(fxn: (arg: T) => Option<T2>) : Option<T2> {
		const tmp : Option<T2> = fxn(this.arg)
		return tmp
	}

	filter(fxn: (arg: T) => boolean) : Option<T> {
		return fxn(this.arg) ? this : new None<T>()
	}

	get() : T {
		return this.arg
	}
}

class None<T> extends Option<T> {

	isDefined() : boolean {
		return false
	}

	map<T2>(fxn: (arg: T) => T2) : Option<T2> {
		return new None<T2>()
	}

	flatMap<T2>(fxn: (arg: T) => Option<T2>) : Option<T2> {
		return new None<T2>()
	}

	filter(fxn: (arg: T) => boolean) : Option<T> {
		return this
	}

	get() : T {
		throw new Error("No value!")
	}
}
