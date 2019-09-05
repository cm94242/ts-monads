import { Option } from './option'

export interface EitherMatch<L, R, T> {
	left: (L) => T,
	right: (R) => T
}

export class Either<L, R> {
	private constructor(private readonly l: Option<Side<L>>, private readonly r: Option<Side<R>>){
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
		return this.isLeft() ? this.l.get().value : this.r.get().value
	}

	match<T>(matcher: EitherMatch<L, R, T>) : T {
		return this.isLeft() ?
			matcher.left(this.value() as L) :
			matcher.right(this.value() as R)
	}

	static left<L, R>(l: L): Either<L, R>{
		return new Either<L, R>(Option.from(new Side(l)), Option.from(null))
	}

	static right<L, R>(r: R): Either<L, R>{
		return new Either<L, R>(Option.from(null), Option.from(new Side(r)))
	}
}

class Side<T> {
	constructor(readonly value: T){}
}

/*
const e1 : Either<string, number> = Either.left('hi')
const e2 : Either<string, number> = Either.right(5)

e1.match({
	left: v => console.log(`left ${v}`),
	right: v => console.log(`right ${v}`)
})
*/
