import { Option } from './option'

export interface EitherMatch<L, R, T> {
	left: (L) => T,
	right: (R) => T
}

export class Either<L, R> {
	private constructor(private readonly l: Option<L>, private readonly r: Option<R>){
		if (!l.isDefined() && !r.isDefined()){
			throw new Error("Both sides cannot be None")
		}
	}

	isLeft() : boolean {
		return this.l.isDefined()
	}

	isRight() : boolean {
		return this.r.isDefined()
	}

	value() : L | R {
		return this.isLeft() ? this.l.get(): this.r.get()
	}

	match<T>(matcher: EitherMatch<L, R, T>) : T {
		return this.isLeft() ?
			matcher.left(this.l.get()) :
			matcher.right(this.r.get())
	}

	static left<L, R>(l: L): Either<L, R>{
		return new Either<L, R>(Option.from(l), Option.from(null))
	}

	static right<L, R>(r: R): Either<L, R>{
		return new Either<L, R>(Option.from(null), Option.from(r))
	}
}
