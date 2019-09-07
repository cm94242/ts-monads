import { Option } from './option'

function resolve_path_inner<T>(content: Object, json_path: string, transformer: (string) => T) : Option<T> {
    const path = json_path.split('.')
    const components = path.slice(0, path.length - 1)
    const key = path[path.length - 1]

    const last : Option<Object> = components.reduce((acc, curr) => {
        return acc.flatMap(v => Option.someOrNone(v[curr]))
    }, Option.some(content))

    return last
        .flatMap(v => Option.someOrNone(v[key]))
        .map(v => `${v}`) // maybe we can find a way not to convert to string first
        .map(v => transformer(v))
}

export function resolve_path(content: Object, json_path: string) : Option<string> {
    return resolve_path_inner(content, json_path, (v) => v)
}

export function parse(content: string) : Option<Object> {
	try {
		return Option.some(JSON.parse(content))
	} catch (err){
		return Option.none()
	}
}
