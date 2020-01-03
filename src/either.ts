import { Option } from './option'

export interface EitherMatch<L, R, T> {
	left: (arg: L) => T,
	right: (art: R) => T
}

export class Either<L, R> {
	private constructor(private readonly l: Option<L>, private readonly r: Option<R>){
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
		return new Either<L, R>(Option.some(l), Option.none())
	}

	static right<L, R>(r: R): Either<L, R>{
		return new Either<L, R>(Option.none(), Option.some(r))
	}
}
