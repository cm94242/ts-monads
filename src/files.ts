import * as fs from 'fs'
import { Option } from './option'
import { resolve_path } from './json'

// this swallows errors on purpose, if you don't want that, read directly
export function read_simple_file(filename: string) : Option<string> {
	try {
		if (fs.existsSync(filename)){
			return Option.some(fs.readFileSync(filename).toString())
		}
	} catch (err){}
	return Option.none()
}

export function read_json_file(filename: string) : Option<Object> {
	return read_simple_file(filename).flatMap(content => {
		try {
			return Option.some(JSON.parse(content))
		} catch (err){}
		return Option.none()
	})
}
